// pages/home/home.js
let app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t = this;
    t.topBanner();
    t.toolLists();
    t.secLevelList();
    t.goodModuleList();

  },

  // 顶部轮播图
  topBanner() {
    let t = this;
    t.setData({
      'info.topBanner': [{
          'banner': '/images/banner01.jpg'
        },
        {
          'banner': '/images/banner01.jpg'
        },
        {
          'banner': '/images/banner01.jpg'
        },
        {
          'banner': '/images/banner01.jpg'
        }
      ]
    })
  },

  // 功能列表
  toolLists() {
    let t = this;
    t.setData({
      'info.toolLists': [{
          'id': '1',
          'menuName': '购物车',
          'menuUrl': '/images/active01.png'
        },
        {
          'id': '2',
          'menuName': '优惠券',
          'menuUrl': '/images/active02.png'
        },
        {
          'id': '3',
          'menuName': '我的订单',
          'menuUrl': '/images/active03.png'
        },
        {
          'id': '4',
          'menuName': '我的收藏',
          'menuUrl': '/images/active04.png'
        },
      ]
    })
  },

  // 二级商品列表
  secLevelList() {
    let t = this;
    t.setData({
      'info.secLevelList': [{
          'id': '1',
          'bgColor': '#e1e8f8',
          'toolName': '书籍',
          'fontColor': '#6784c8',
          'tooldesc': '“全场低至5折”',
          'toolUrl': '/images/book_list.png'
        },
        {
          'id': '2',
          'bgColor': '#e0f3fb',
          'toolName': '办公',
          'fontColor': '#60a4c1',
          'tooldesc': '“满299立减100”',
          'toolUrl': '/images/bangong_list.png'
        }, {
          'id': '3',
          'bgColor': '#fcf7ee',
          'toolName': '居家',
          'fontColor': '#dbbd88',
          'tooldesc': '“2件8折”',
          'toolUrl': '/images/jujia_list.png'
        }, {
          'id': '4',
          'bgColor': '#e2dff6',
          'toolName': '数码',
          'fontColor': '#8f86ca',
          'tooldesc': '“满千减百”',
          'toolUrl': '/images/shuma_list.png'
        }
      ]

    })


  },

  // 商品模板列表
  goodModuleList() {
    let t = this;
    t.setData({
      'info.goodsModule': {
        'moduleName': '超值热卖',
        'moduleList': [{
            'goodsId': '1',
            'goodsImg': '/images/goods01.png',
            'goodsName': '女士白色长颈鹿T恤',
            'goodsPrice': '¥' + '69.00'
          },
          {
            'goodsId': '2',
            'goodsImg': '/images/goods02.png',
            'goodsName': '女式黑色长裤子',
            'goodsPrice': '¥' + '21.60'
          },
          {
            'goodsId': '3',
            'goodsImg': '/images/goods01.png',
            'goodsName': '女士白色长颈鹿T恤',
            'goodsPrice': '¥' + '69.00'
          },
          {
            'goodsId': '4',
            'goodsImg': '/images/goods02.png',
            'goodsName': '女式黑色长裤子',
            'goodsPrice': '¥' + '21.60'
          },
        ]
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})