// pages/my/my.js
const app = new getApp();
// const config = require("./../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    info: {
      // domain_name: app.domain_name_url.domain_name,//域名
      // domain_img: app.domain_name_url.domain_img, //图片域名
      shareFlag: false,
      distributorApplication: '/pages/distributor/distributor-application/distributor-application',//申请分销商地址
      userDistributor: '/pages/distributor/user-distributor/user-distributor',//成为分销商地址
      applyTime: '/pages/distributor/apply-time/apply-time',//申请时间

      // 我的功能栏
      navList: [
        {
          title: '订单信息',
          state: 0,
          functions: [
            {
              img: '../../images/daifukuan.png',
              text: '待付款',
              url: '/pages/my/order/order?index=1'
            },
            {
              img: '../../images/daishouhuo.png',
              text: '待收货',
              url: '/pages/my/order/order?index=2'
            },
            {
              img: '../../images/yiwancheng.png',
              text: '已完成',
              url: '/pages/my/order/order?index=3'
            },
            {
              img: '../../images/dingdan.png',
              text: '全部订单',
              url: '/pages/my/order/order?index=0'
            }
          ]
        },
        {
          title: '我的服务',
          state: 2,
          functions: [
            {
              img: '../../images/youhuijuan02.png',
              text: '优惠券',
              url: '/pages/my/discount-coupon/discount-coupon'
            },
            {
              img: '../../images/huiyuanka01.png',
              text: '会员卡',
              url: '/pages/member/my-member/my-member'
            },
            {
              img: '../../images/tuangou01.png',
              text: '我的团购',
              url: '/pages/group-buying/group-buying-state/group-buying-state'
            },
            {
              img: '../../images/shouchang-01.png',
              text: '收藏',
              url: '/pages/my/collect/collect'
            },
            {
              img: '../../images/wodedizhi.png',
              text: '我的地址',
              url: '/pages/my/side/side'
            },
          ]
        },
      ],
    },
    port: {
      getUserConf: 'WXAPI/index/getUserConf',//用户信息
      getIndexList: 'WXAPI/index/getIndexList',//我的功能
      gethandle: 'WXAPI/index/gethandle',//获取配置
      qrcode: 'WXAPI/store/qrcode',//推广二维码
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
    console.log(t.data.info.appInfo);
    // console.log(t.data.info.appInfo);
    t.getUserConf();//用户信息
    // t.getIndexList();//我的功能
    // t.getIndexList01();//我的功能
    // t.gethandle();//获取配置
    // t.qrcode();//推广二维码
  },

  // 获取formid
  submitInfo: function (e) {
    let t = this;
    let user_res = t.data.info.appInfo;
    let openid = user_res.open_id;
    config.POST({
      action_url: t.data.port.get_form_id,
      params: {
        formid: e.detail.formId,
        openid: openid,
      },
      success: function (data) {
        console.log(data);
      }
    });
  },

  // 推广二维码
  qrcode: function () {
    let t = this;
    config.POST({
      action_url: t.data.port.qrcode,
      params: {
        openid: app.user_info.open_id
      },
      success: function (data) {
        t.setData({
          'info.generalize': data.data.result.tuiguangimg
        })
      }
    });
  },

  // 获取配置
  gethandle: function () {
    let t = this;
    config.POST({
      action_url: t.data.port.gethandle,
      params: {
        inc_type: 'shop_info',
        name: 'is_distributor'
      },
      success: function (data) {
        console.log(data);
        console.log(data.data.result);
        t.setData({
          'info.distributionStatus': data.data.result
        })
      }
    });
  },
  // 我的功能--高阶功能
  getIndexList: function () {
    let t = this;
    config.POST({
      action_url: t.data.port.getIndexList,//获取单个订单数据接口
      params: {
        type: 1
      },
      success: function (data) {
        console.log(data);
        t.setData({
          'info.funs': data.data.result
        })
      }
    });
  },
  // 我的功能--低阶功能
  getIndexList01: function () {
    let t = this;
    config.POST({
      action_url: t.data.port.getIndexList,//获取单个订单数据接口
      params: {
        status: 1
      },
      success: function (data) {
        console.log(data);
        t.setData({
          'info.funs01': data.data.result
        })
      }
    });
  },

  // 用户信息
  getUserConf: function () {
    let t = this;
    t.setData({
      'info.userInfo': { 'pay_points': '30', 'user_money': '50.99', 'son_sum': '99'}
    })
  },
  // 点击显示我要分享
  showShare: function () {
    this.setData({
      'info.shareFlag': true
    })
  },
  // 显示分享图片
  iSee: function () {
    let t = this,
      info = t.data.info;
    console.log(info.generalize);
    wx.previewImage({
      current: info.domain_name + info.generalize,
      urls: [info.domain_name + info.generalize],
    })
    t.setData({
      'info.shareFlag': false
    })
  },
  // 退出
  esc: function () {
    this.setData({
      'info.shareFlag': false
    })
  },
  // 转发
  onShareAppMessage: function () {
    let obj = util.functions.getTranspond(app);
    return {
      title: obj.name,
      path: obj.url,
    }
  },
})