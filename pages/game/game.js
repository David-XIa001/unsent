const app = getApp()
const chains = require('../../data/chains')
const characters = require('../../data/characters')

// 确定性线性同余伪随机数生成器 (LCG)
function createSeedRandom(seed) {
  var s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280.0;
  };
}

// 提取今日数字作为随机种子
function getTodaySeed() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  return year * 10000 + month * 100 + date;
}

Page({
  data: {
    story: '',
    typedStory: '',
    typingFinished: false,
    choices: [],
    over: false,
    win: false,
    msg: '',
    day: 1,
    saved: 0,
    modeText: '自由探索'
  },

  onLoad: function (options) {
    this._mode = options.mode || 'free'
    this.startGame()
  },

  onUnload: function () {
    if (this._typingTimer) {
      clearInterval(this._typingTimer)
    }
  },

  startGame: function () {
    if (this._typingTimer) {
      clearInterval(this._typingTimer)
    }

    var chrList = characters
    if (!chrList || chrList.length === 0) {
      this.setData({ over: true, win: false, msg: '角色数据加载失败' })
      return
    }

    var randFn = Math.random
    if (this._mode === 'daily') {
      var seed = getTodaySeed()
      randFn = createSeedRandom(seed)
    }

    var chr = chrList[Math.floor(randFn() * chrList.length)]
    if (!chr.chains || chr.chains.length === 0) {
      this.setData({ over: true, win: false, msg: '该角色没有可用任务链' })
      return
    }

    var chainId = chr.chains[Math.floor(randFn() * chr.chains.length)]
    var chain = chains[chainId]
    if (!chain) {
      this.setData({ over: true, win: false, msg: '任务链数据加载失败' })
      return
    }

    this._flags = {}
    this._chr = chr
    this._chain = chain
    this._currentNodeId = chain.startNode || null

    if (!this._currentNodeId || !chain.nodes[this._currentNodeId]) {
      this.setData({ over: true, win: false, msg: '任务链起始节点无效' })
      return
    }

    var story = chr.description + '。' + chain.description
    this._loadNode(this._currentNodeId, story)
  },

  _loadNode: function (nodeId, prefixStory) {
    var node = this._chain.nodes[nodeId]
    if (!node) {
      this._handleWin()
      return
    }

    var story = prefixStory + node.description
    var choices = []
    var desc = node.description

    // 收集当前节点中所有需要高亮的关键字 (Hints 与 Modifiers 匹配词)
    var highlightWords = []
    if (node.hints && Array.isArray(node.hints)) {
      highlightWords = highlightWords.concat(node.hints)
    }
    
    for (var i = 0; i < node.choices.length; i++) {
      var ch = node.choices[i]

      if (!this._checkConditions(ch.conditions)) {
        continue
      }

      var finalRate = ch.deathRate
      var modifierTriggered = false

      if (ch.modifiers && Array.isArray(ch.modifiers)) {
        for (var j = 0; j < ch.modifiers.length; j++) {
          var mod = ch.modifiers[j]
          highlightWords.push(mod.word)
          if (desc.indexOf(mod.word) !== -1) {
            finalRate += mod.adj
            modifierTriggered = true
          }
        }
      }

      if (finalRate < 0.05) finalRate = 0.05
      if (finalRate > 0.95) finalRate = 0.95

      // 隐藏精准死亡率，转换为警告词氛围指示
      var riskText = ''
      var riskClass = ''
      if (finalRate <= 0.2) {
        riskText = '🟢 感觉还好...'
        riskClass = 'risk-low'
      } else if (finalRate <= 0.4) {
        riskText = '🟡 有些不安...'
        riskClass = 'risk-mid'
      } else if (finalRate <= 0.6) {
        riskText = '🟠 心跳加速...'
        riskClass = 'risk-high'
      } else if (finalRate <= 0.8) {
        riskText = '🔴 极度危险...'
        riskClass = 'risk-extreme'
      } else {
        riskText = '💀 必死之路...'
        riskClass = 'risk-extreme-shake'
      }

      var entry = {
        id: ch.id,
        txt: ch.text,
        risk: riskText,
        riskClass: riskClass,
        rate: finalRate,
        cause: ch.deathCause,
        win: ch.isSuccess || false,
        clue: false
      }

      if (modifierTriggered && finalRate !== ch.deathRate) {
        entry.clue = true
        if (finalRate > ch.deathRate) {
          entry.clueTip = '⚠️ 你似乎忽略了某个细节...'
        } else {
          entry.clueTip = '✓ 你注意到了一条重要线索！'
        }
      }

      choices.push(entry)
    }

    // 过滤去重高亮词
    var uniqueWords = []
    for (var k = 0; k < highlightWords.length; k++) {
      var w = highlightWords[k]
      if (w && uniqueWords.indexOf(w) === -1) {
        uniqueWords.push(w)
      }
    }
    this._highlightWords = uniqueWords

    this.setData({
      story: story,
      typedStory: '',
      typingFinished: false,
      choices: choices,
      over: false,
      win: false,
      msg: '',
      day: (app.globalData.survivalDays || 0) + 1,
      saved: app.globalData.survivalDays || 0,
      modeText: this._mode === 'daily' ? '今日挑战' : '自由探索'
    })

    this._startTyping(story)
  },

  _applyHighlights: function (story) {
    if (!this._highlightWords || this._highlightWords.length === 0) {
      return story
    }
    var html = story
    var sortedWords = this._highlightWords.slice().sort(function (a, b) {
      return b.length - a.length
    })

    for (var i = 0; i < sortedWords.length; i++) {
      var word = sortedWords[i]
      // 高亮关键字渲染：霓虹金黄色，文字冒险悬疑感十足
      var repl = '<span style="color: #ffe66d; font-weight: bold; text-shadow: 0 0 10px rgba(255, 230, 109, 0.6);">' + word + '</span>'
      var reg = new RegExp(word, 'g')
      html = html.replace(reg, repl)
    }
    return html
  },

  _startTyping: function (story) {
    if (this._typingTimer) {
      clearInterval(this._typingTimer)
    }

    var that = this
    var currentLen = 0
    var totalLen = story.length

    if (totalLen === 0) {
      this.setData({
        typedStory: '',
        typingFinished: true
      })
      return
    }

    this._typingTimer = setInterval(function () {
      currentLen++
      if (currentLen >= totalLen) {
        clearInterval(that._typingTimer)
        var htmlStory = that._applyHighlights(story)
        that.setData({
          typedStory: htmlStory,
          typingFinished: true
        })
      } else {
        that.setData({
          typedStory: story.substring(0, currentLen)
        })
      }
    }, 35)
  },

  skipTyping: function () {
    if (!this.data.typingFinished) {
      if (this._typingTimer) {
        clearInterval(this._typingTimer)
      }
      var htmlStory = this._applyHighlights(this.data.story)
      this.setData({
        typedStory: htmlStory,
        typingFinished: true
      })
      wx.vibrateShort({ type: 'light' })
    }
  },

  _checkConditions: function (conditions) {
    if (!conditions || typeof conditions !== 'object') return true
    var keys = Object.keys(conditions)
    if (keys.length === 0) return true
    for (var i = 0; i < keys.length; i++) {
      if (this._flags[keys[i]] !== conditions[keys[i]]) return false
    }
    return true
  },

  onPick: function (e) {
    if (this.data.over) return
    
    // 如果文字还没有吐完，第一次点击任何区域都是“跳过打字”
    if (!this.data.typingFinished) {
      this.skipTyping()
      return
    }

    // 轻触短震动反馈
    wx.vibrateShort({ type: 'light' })

    var id = e.currentTarget.dataset.id
    for (var i = 0; i < this.data.choices.length; i++) {
      if (this.data.choices[i].id === id) {
        this._doChoice(this.data.choices[i])
        return
      }
    }
  },

  _doChoice: function (ch) {
    var node = this._chain.nodes[this._currentNodeId]
    var originalChoice = null
    for (var i = 0; i < node.choices.length; i++) {
      if (node.choices[i].id === ch.id) {
        originalChoice = node.choices[i]
        break
      }
    }

    if (originalChoice && originalChoice.effects) {
      var effKeys = Object.keys(originalChoice.effects)
      for (var j = 0; j < effKeys.length; j++) {
        this._flags[effKeys[j]] = originalChoice.effects[effKeys[j]]
      }
    }

    if (Math.random() < ch.rate) {
      app.addDeathRecord(ch.cause)
      var realPercentage = Math.round(ch.rate * 100)
      this.setData({ 
        over: true, 
        win: false, 
        msg: '你死了...\n\n死因: ' + ch.cause + '\n\n【命运解密】你选择的这条路线真实暴毙率高达 ' + realPercentage + '%！'
      })
      // 遭遇死亡，触发重震动
      wx.vibrateLong()
      return
    }

    var nextNode = originalChoice ? originalChoice.nextNode : null
    if (nextNode && this._chain.nodes[nextNode]) {
      this._currentNodeId = nextNode
      this._loadNode(nextNode, '')
    } else {
      this._handleWin()
    }
  },

  _handleWin: function () {
    app.addSurvivalDay()
    this.setData({
      over: true,
      win: true,
      saved: app.globalData.survivalDays,
      msg: '恭喜你成功' + this._chain.name + '！\n\n今天是你存活的第' + app.globalData.survivalDays + '天。'
    })

    // 获胜欢快节奏震动
    wx.vibrateShort({ type: 'medium' })
    setTimeout(function () { wx.vibrateShort({ type: 'light' }) }, 150)
    setTimeout(function () { wx.vibrateShort({ type: 'light' }) }, 300)
  },

  restart: function () {
    this.startGame()
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 })
  }
})
