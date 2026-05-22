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

  startGame: function () {
    wx.navigateTo({
      url: '/pages/game/game'
    })
  }
})