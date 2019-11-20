// pages/classify/classify.js
const app = new getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      // domain_name: app.domain_name_url.domain_name,//接口名
      // domain_img: app.domain_name_url.domain_img, //图片域名
      index: 0,//左侧分类选中下标
    },
    port: {
      getClassify: 'WXAPI/goods/getClassify',//分类信息
      get_form_id: 'WXAPI/store/addTpmessage', // 收集form_id
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this;
    t.setData({
      'info.appInfo': app.user_info
    })
    t.getClassify('', 0);//分类信息
  },
  // 转发
  onShareAppMessage: function () {
    let obj = util.functions.getTranspond(app);
    return {
      title: obj.name,
      path: obj.url,
    }
  },
  // 获取formid
  submitInfo: function (e) {
    let t = this;
    let user_res = t.data.info.appInfo;
    let openid = user_res.open_id;
    // config.POST({
    //   action_url: t.data.port.get_form_id,
    //   params: {
    //     formid: e.detail.formId,
    //     openid: openid,
    //   },
    //   success: function (data) {
    //     console.log(data);
    //   }
    // });
  },
  /**
   * 点击搜索触发
   */
  search: function (e) { this.classUrl(); },
  /**
   * 实时获取搜索框的值
   */
  realTimeSearch: function (e) { this.setData({ 'info.keywords': e.detail.value }) },
  /**
   * 左侧点击搜索
   */
  leftClickSearch: function () { this.classUrl(); },
  /**
   * 跳转到分类页面
   */
  classUrl: function () {
    wx.navigateTo({
      url: '/pages/goods-list/goods-list?text=' + this.data.info.keywords,
    })
  },
  /**
   * 截取替换字符串
   */
  listInstead: function (list) {
    list.forEach(item => {
      item.name = util.functions.singleInstead(item.name, 4);
    })
  },
  // 左侧分类信息
  getClassify: function (id, index) {
    let t = this;
    // config.POST({
    //   action_url: t.data.port.getClassify,//获取单个订单数据接口
    //   params: {
    //     id: id,
    //   },
    //   success: function (data) {
    //     t.setData({
    //       'info.leftClass': data.data.result,
    //       'info.index': index,
    //       'info.id': id
    //     })
    //   }
    // });
  },

  // 选择分类信息
  queryClassInfo: function (e) {
    let t = this,
      current = e.currentTarget.dataset;
    if (current.index != t.data.info.index) {
      t.getClassify(current.id, current.index);
    }
  },
})