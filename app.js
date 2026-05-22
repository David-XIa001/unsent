App({
  globalData: {
    survivalDays: 0,
    deathRecords: []
  },

  onLaunch: function () {
    this.loadGameData()
  },

  loadGameData: function () {
    try {
      const data = wx.getStorageSync('gameData')
      if (data && typeof data === 'object') {
        this.globalData.survivalDays = typeof data.survivalDays === 'number' ? data.survivalDays : 0
        this.globalData.deathRecords = Array.isArray(data.deathRecords) ? data.deathRecords : []
      }
    } catch (e) {
      console.error('加载游戏数据失败', e)
    }
  },

  saveGameData: function () {
    try {
      wx.setStorageSync('gameData', {
        survivalDays: this.globalData.survivalDays,
        deathRecords: this.globalData.deathRecords
      })
    } catch (e) {
      console.error('保存游戏数据失败', e)
    }
  },

  addSurvivalDay: function () {
    this.globalData.survivalDays++
    this.saveGameData()
  },

  addDeathRecord: function (deathCause) {
    const record = this.globalData.deathRecords.find(r => r.cause === deathCause)
    if (record) {
      record.count++
    } else {
      this.globalData.deathRecords.push({ cause: deathCause, count: 1 })
    }
    this.saveGameData()
  }
})