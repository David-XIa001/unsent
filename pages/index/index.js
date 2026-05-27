const app = getApp()

Page({
  data: {
    survivalDays: 0
  },

  onLoad: function () {
    this.loadSurvivalDays()
  },

  onShow: function () {
    this.loadSurvivalDays()
  },

  loadSurvivalDays: function () {
    const days = app && app.globalData ? app.globalData.survivalDays || 0 : 0
    this.setData({
      survivalDays: days
    })
  },

  startDailyGame: function () {
    wx.navigateTo({
      url: '/pages/game/game?mode=daily'
    })
  },

  startFreeGame: function () {
    wx.navigateTo({
      url: '/pages/game/game?mode=free'
    })
  },

  startEscapeRoom: function () {
    wx.navigateTo({
      url: '/pages/game/game?chainId=escape_room'
    })
  },

  openMuseum: function () {
    wx.navigateTo({
      url: '/pages/museum/museum'
    })
  }
})