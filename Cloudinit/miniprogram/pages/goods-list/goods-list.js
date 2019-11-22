// pages/goods-list/goods-list.js
const app = new getApp();
// const config = require("../../config.js");
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      sortFlag: false, //点击显示排序，默认不显示
      sortName: '', //显示选中排序方式名
      sortIndex: 0, //选中排序下标
      sortArray: [{ name: '价格降序', sort: 0 }, { name: '价格升序', sort: 1 }],
      classIndex: 0, // 选中分类下标
      // domain_img: app.domain_name_url.domain_img, //域名
      // domain_name: app.domain_name_url.domain_name, //域名
    },
    port: {
      getMore: 'WXAPI/goods/getMore', //分类
      search: 'WXAPI/Goods/search',//搜索
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this,
      info = t.data.info;
    console.log(options);
    t.setData({
      'info.options': options,
      'info.classIndex': options.id == undefined ? 0 : options.id
    })
    options.text != undefined ? t.search(options) : t.getMore(options, info.sortArray[info.sortIndex].sort);
  },
  // 搜索
  search: function (options) {
    let t = this;
    // config.POST({
    //   action_url: t.data.port.search, //分类信息
    //   params: {
    //     name: options.text
    //   },
    //   success: function (data) {
    //     let res = data.data.result;
    //     console.log(res);
    //     t.setData({
    //       'info.array': res,
    //       'info.text': options.text
    //     })
    //   }
    // });


  },
  // 分类信息
  getMore: function (options, sort) {
    let t = this;

    // config.POST({
    //   action_url: t.data.port.getMore, //分类信息
    //   params: {
    //     cart_id: options.id,
    //     order: sort
    //   },
    //   success: function (data) {
    //     let res = data.data.result;
    //     console.log(res);
    //     t.setData({
    //       'info.array': res
    //     })
    //   }
    // });

  },
  // 选择分类
  queryClassify: function (e) {
    let t = this,
      info = t.data.info;
    // console.log(options);
    // let cart_id = options.id;
    console.log(info);
    let sort = info.sortIndex;
    let cart_id = e.currentTarget.dataset.index;
    console.log(cart_id);
    config.POST({
      action_url: t.data.port.getMore, //分类信息
      params: {
        cart_id: cart_id,
        order: sort
      },
      success: function (data) {
        let res = data.data.result;
        console.log(res.info.id);
        t.setData({
          'info.array': res,
          'info.listId': res.info.id,
        })
      }
    });
  },
  // 选择排序方式
  querySort: function (e) {
    let t = this;
    let name = e.currentTarget.dataset.name,
      sortName = t.data.info.sortName,
      index = e.currentTarget.dataset.index,
      info = t.data.info;
    if (name != sortName) {
      // 查询
      t.setData({
        'info.sortName': name,
        'info.sortIndex': index
      })
      info.options.text != undefined ? t.search(info.options) : t.getMore(info.options, info.sortArray[index].sort);
    }

    t.setData({
      'info.sortFlag': false,
    })
  },
  // 排序选择显示状态
  sortShow: function () {
    let t = this;
    t.data.info.sortFlag ? t.setData({
      'info.sortFlag': false
    }) : t.setData({
      'info.sortFlag': true
    })
  },
  // 退出所有遮罩层
  esc: function () {
    this.setData({
      'info.sortFlag': false
    })
  },
})