// pages/shopping-cart/shopping-cart.js
let app = new getApp();
let util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // info: {
    //   domain_img: app.domain_name_url.domain_img, //域名
    // },
    // 接口
    // port: {
    //   cartList: 'index.php/WXAPI/cart/cartList', //购物车商品
    //   updateNum: 'index.php/WXAPI/cart/updateNum', //修改数量
    //   updateSelect: 'index.php/WXAPI/cart/updateSelect',//修改购物车选中状态
    //   delCart: 'index.php/WXAPI/cart/delCart',//删除购物车
    //   batchDel: '/WXAPI/cart/batchDel',//批量删除
    //   get_form_id: 'WXAPI/store/addTpmessage', // 收集form_id
    // },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t = this;
    t.setData({
      'info.appInfo': app.user_info
    })
  },
  // 获取formid
  // submitInfo: function (e) {
  //   console.log('GG 敌方军团已同意投降 4票赞成 0票反对')
  //   let t = this;
  //   let user_res = t.data.info.appInfo;
  //   console.log(user_res);
  //   let openid = user_res.open_id;
  //   config.POST({
  //     action_url: t.data.port.get_form_id,
  //     params: {
  //       formid: e.detail.formId,
  //       openid: openid,
  //     },
  //     success: function (data) {
  //       console.log(data);
  //     }
  //   });
  // },

  launchAppError: function(e) {
    console.log(e.detail)
  },

  onShow: function() {
    let t = this;
    t.carInfo(); // 购物车数据
  },
  // 转发
  onShareAppMessage: function() {
    let obj = util.functions.getTranspond(app);
    return {
      title: obj.name,
      path: obj.url,
    }
  },
  // 批量删除
  batchDelete: function() {
    let t = this;
    let cl = t.data.info.carList;
    let idStr = '',
      flag = false;
    cl.forEach((item, index) => {
      if (item.selected === '1') {
        idStr += item.id + ',';
        flag = true;
      }
      if (cl.length - 1 === index && flag) {
        config.POST({
          action_url: t.data.port.batchDel,
          params: {
            id: idStr,
          },
          success: function(data) {
            console.log(data);
            if (data.data.msg === '删除成功') {
              t.carInfo();
            }
            util.functions.promptBoxStatus(t, data.data.msg, 1500);
          }
        });
      } else {
        util.functions.promptBoxStatus(t, "请选择商品", 1500);
      }
    })
    console.log(idStr);
  },
  /**
   * 提示框显示状态
   */
  promptBox: function(e) {
    console.log("哈哈哈")
    this.setData({
      msg: '确定删除吗?',
      popupWindowFlag: true,
      del: e.currentTarget.dataset.del
    })
  },
  // 取消删除
  cancel: function() {
    this.setData({
      popupWindowFlag: false,
    })
  },
  // 确认删除
  confirm: function() {
    let t = this;
    if (t.data.del === 'batch') {
      t.batchDelete();
    } else {
      t.deleteGoods(t.data.info.goodsId);
    }
    t.setData({
      popupWindowFlag: false
    })
  },
  /**
   * 删除购物车商品
   */
  deleteGoods: function(id) {
    let t = this;
    config.POST({
      action_url: t.data.port.delCart,
      params: {
        id: id,
      },
      success: function(data) {
        console.log(data.data);
        if (data.data.status === 1) {
          t.carInfo();
        }
        util.functions.promptBoxStatus(t, '删除成功', 1500); //提示
        t.setData({
          'info.slide_index': -1
        })
      }
    });
  },
  // 立即结算
  settleAccounts: function(e) {
    let t = this;
    if (t.data.info.carList.length >= 1) {
      wx.navigateTo({
        url: '/pages/submit-order/submit-order',
      })
    } else {
      util.functions.promptBoxStatus(t, '您的购物车没有商品', 1500);
    }
  },
  // 检查是否为全选中状态
  checkChooseList: function(list) {
    let t = this;
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected === '0') {
        t.setData({
          'info.selected': 0,
        })
        return;
      }
    }
    t.setData({
      'info.selected': 1,
    })
  },
  // 点击复选框
  clickChoose: function(e) {
    let t = this;
    let id = e.currentTarget.dataset.id;
    let sele = e.currentTarget.dataset.sele;
    if (sele === '0') {
      t.shoppingCartStatus(id, '1');
    } else {
      t.shoppingCartStatus(id, '0');
    }
  },
  // 修改购物车选中状态
  shoppingCartStatus: function(id, selected) {
    console.log(selected);
    let t = this;
    config.POST({
      action_url: t.data.port.updateSelect,
      params: {
        id: id,
        selected: selected
      },
      success: function(data) {
        if (data.data.msg === '成功') {
          t.carInfo();
        }
      }
    });
  },
  // 全选反选
  futureGenerationsThe: function(e) {
    let t = this;
    let scd = t.data.info.carList
    if (e.currentTarget.dataset.sele === 0) {
      scd.forEach(item => {
        if (item.selected === '0') {
          t.shoppingCartStatus(item.id, 1);
        }
      })
    } else if (e.currentTarget.dataset.sele === 1) {
      scd.forEach(item => {
        if (item.selected === '1') {
          t.shoppingCartStatus(item.id, 0);
        }
      })
    }
  },
  // 修改购物车数量
  updateNum: function(e) {
    let t = this;
    let state = e.currentTarget.dataset.state,
      num = parseInt(e.currentTarget.dataset.num);
    if (num > 1) {
      if (state === '减') {
        --num
      }
    }
    if (state === '加') {
      ++num
    }
    config.POST({
      action_url: t.data.port.updateNum,
      params: {
        id: e.currentTarget.dataset.id,
        num: num
      },
      success: function(data) {
        if (data.data.msg === '成功') {
          t.carInfo();
        }
      }
    });
  },
  // 购物车数据
  carInfo: function() {
    let t = this;
    const cartList = [{
      'id': '1',
      'selected': '1',
      'image': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg',
      'goods_name': '华为Mate30',
      'goods_remark': '优惠85折',
      'member_goods_price': '4600.00',
      'goods_num': '3'
    }, ];
    const total_price = {
      'total_price': '8700.00'
    }


    t.setData({
      'info.carList': cartList,
      'info.total_fee': total_price
    })



    // config.POST({
    //   action_url: t.data.port.cartList,
    //   params: {
    //     user: app.user_info.user_id
    //   },
    //   success: function (data) {
    //     if (data.data.status === -1) {
    //       t.setData({
    //         'info.carList': []
    //       })
    //     } else if (data.data.status === 1) {
    //       t.setData({
    //         'info.carList': data.data.result.list,
    //         'info.total_fee': data.data.result.total_price
    //       })
    //       t.checkChooseList(data.data.result.list);//检查是否为全选中状态
    //     }
    //   }
    // });

  },
})