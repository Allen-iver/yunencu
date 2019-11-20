// pages/improve/improve.js
let app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadFlag: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this;
    t.accreditLogin();
  },

  // 调用用户获取权限功能
  accreditLogin: function () {
    let t = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log(res);
          //获取用户权限
          app.userLogin_im(t, false);
        } else {
          t.setData({
            loadFlag: false
          })
        }
      }
    })
  },

  // 页面点击授权
  bindGetUserInfo: function (e, options) {
    let t = this;
    app.userLogin_im(t, false);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})