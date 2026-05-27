const chains = require('../../data/chains')
const app = getApp()

// 提取当前所有任务链中可能的死因
function extractAllDeathCauses() {
  var causes = []
  var keys = Object.keys(chains)
  for (var i = 0; i < keys.length; i++) {
    var chain = chains[keys[i]]
    if (chain.nodes) {
      var nodeKeys = Object.keys(chain.nodes)
      for (var j = 0; j < nodeKeys.length; j++) {
        var node = chain.nodes[nodeKeys[j]]
        if (node.choices) {
          for (var k = 0; k < node.choices.length; k++) {
            var ch = node.choices[k]
            // 如果有死因，且去重
            if (ch.deathCause && ch.deathCause.trim() !== '') {
              // 排除一些标志性的通关或成功文本
              if (ch.deathCause.indexOf('成功') === -1 && ch.deathCause.indexOf('胜利') === -1) {
                if (causes.indexOf(ch.deathCause) === -1) {
                  causes.push(ch.deathCause)
                }
              }
            }
          }
        }
      }
    }
  }
  return causes
}

// 馆长极具黑色幽默的锐评
function getCauseComment(cause) {
  if (cause.indexOf('触电') !== -1 || cause.indexOf('高压') !== -1 || cause.indexOf('电闸') !== -1 || cause.indexOf('电线') !== -1 || cause.indexOf('电弧') !== -1) {
    return '馆长锐评：看来你是电击疗法的忠实支持者，对雷电之力毫无防备之心。'
  }
  if (cause.indexOf('摔死') !== -1 || cause.indexOf('摔倒') !== -1 || cause.indexOf('坠') !== -1 || cause.indexOf('踏空') !== -1 || cause.indexOf('滑落') !== -1) {
    return '馆长锐评：地心引力很强吧？下辈子出门记得看路，要不就去买份重力险。'
  }
  if (cause.indexOf('被车') !== -1 || cause.indexOf('撞') !== -1 || cause.indexOf('交通事故') !== -1 || cause.indexOf('电动车') !== -1) {
    return '馆长锐评：马路不是你家开的，红绿灯不是氛围灯。答应我，下辈子看好两边再走。'
  }
  if (cause.indexOf('咬') !== -1 || cause.indexOf('犬') !== -1 || cause.indexOf('蛛') !== -1 || cause.indexOf('恶霸') !== -1) {
    return '馆长锐评：大自然并不想和你交朋友，它们只是在挑剔的胃口面前把你当成了快餐。'
  }
  if (cause.indexOf('毒') !== -1 || cause.indexOf('瓦斯') !== -1 || cause.indexOf('酸') !== -1 || cause.indexOf('窒息') !== -1) {
    return '馆长锐评：这刺鼻的味道，是科学的芬芳，更是你过于草率吸入的代价。'
  }
  if (cause.indexOf('砸') !== -1 || cause.indexOf('坠落物') !== -1 || cause.indexOf('天花板') !== -1 || cause.indexOf('坍塌') !== -1) {
    return '馆长锐评：天降正义！下辈子出门，建议随身戴一顶钛合金安全帽。'
  }
  if (cause.indexOf('炸') !== -1 || cause.indexOf('爆') !== -1) {
    return '馆长锐评：艺术就是爆炸！而你不仅亲眼见证，还亲自成为了艺术的原料。'
  }
  if (cause.indexOf('尖锐') !== -1 || cause.indexOf('刺穿') !== -1 || cause.indexOf('割破') !== -1 || cause.indexOf('玻璃') !== -1) {
    return '馆长锐评：尖锐的东西总是很迷人，尤其是在它切开你的动脉的时候。'
  }
  if (cause.indexOf('批评') !== -1 || cause.indexOf('伤心') !== -1 || cause.indexOf('羞愧') !== -1) {
    return '馆长锐评：心灵脆弱的倒霉蛋，死神的镰刀这次甚至没有沾血。'
  }
  return '馆长锐评：死法千奇百怪，而你总是能用优美的姿态精准踩中死神的陷阱。'
}

Page({
  data: {
    totalCauses: 0,
    unlockedCauses: 0,
    percentage: 0,
    causesList: [],
    totalDeaths: 0
  },

  onLoad: function () {
    this.loadMuseumData()
  },

  onShow: function () {
    this.loadMuseumData()
  },

  loadMuseumData: function () {
    var allCauses = extractAllDeathCauses()
    var userRecords = app.globalData.deathRecords || []
    
    var recordMap = {}
    var totalDeaths = 0
    for (var i = 0; i < userRecords.length; i++) {
      recordMap[userRecords[i].cause] = userRecords[i].count
      totalDeaths += userRecords[i].count
    }

    var list = []
    var unlockedCount = 0
    for (var j = 0; j < allCauses.length; j++) {
      var cause = allCauses[j]
      var unlocked = recordMap.hasOwnProperty(cause)
      var count = unlocked ? recordMap[cause] : 0
      if (unlocked) unlockedCount++

      list.push({
        cause: cause,
        unlocked: unlocked,
        count: count,
        comment: getCauseComment(cause)
      })
    }

    // 将已解锁的排在前面，增加可读性
    list.sort(function (a, b) {
      if (a.unlocked && !b.unlocked) return -1
      if (!a.unlocked && b.unlocked) return 1
      return b.count - a.count // 按遭遇次数降序
    })

    this.setData({
      totalCauses: allCauses.length,
      unlockedCauses: unlockedCount,
      percentage: allCauses.length > 0 ? Math.round((unlockedCount / allCauses.length) * 100) : 0,
      causesList: list,
      totalDeaths: totalDeaths
    })
  },

  // 重置数据
  resetMuseum: function () {
    var that = this
    wx.showModal({
      title: '重塑记忆',
      content: '这将清空所有解锁的死亡图鉴和天数记录，死神将遗忘你的一切，确定继续吗？',
      confirmColor: '#ff6b6b',
      success: function (res) {
        if (res.confirm) {
          app.globalData.survivalDays = 0
          app.globalData.deathRecords = []
          app.saveGameData()
          that.loadMuseumData()
          wx.showToast({
            title: '记忆重塑成功',
            icon: 'success'
          })
        }
      }
    })
  },

  goBack: function () {
    wx.navigateBack({ delta: 1 })
  }
})
