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
      index: 0, //左侧分类选中下标
    },
    port: {
      getClassify: 'WXAPI/goods/getClassify', //分类信息
      get_form_id: 'WXAPI/store/addTpmessage', // 收集form_id
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t = this;
    t.setData({
      'info.appInfo': app.user_info
    })
    t.getClassify('', 0); //分类信息
  },
  // 转发
  onShareAppMessage: function() {
    let obj = util.functions.getTranspond(app);
    return {
      title: obj.name,
      path: obj.url,
    }
  },
  // 获取formid
  submitInfo: function(e) {
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
  search: function(e) {
    this.classUrl();
  },
  /**
   * 实时获取搜索框的值
   */
  realTimeSearch: function(e) {
    console.log(e.detail.value);
    this.setData({
      'info.keywords': e.detail.value
    })
  },
  /**
   * 左侧点击搜索
   */
  leftClickSearch: function() {
    this.classUrl();
  },
  /**
   * 跳转到分类页面
   */
  classUrl: function() {
    wx.navigateTo({
      url: '/pages/goods-list/goods-list?text=' + this.data.info.keywords,
    })
  },
  /**
   * 截取替换字符串
   */
  listInstead: function(list) {
    list.forEach(item => {
      item.name = util.functions.singleInstead(item.name, 4);
    })
  },
  // 左侧分类信息
  getClassify: function(id, index) {
    let t = this;
    let list_left = [
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                  'goods_id': '1',
                  'goods_name': '华为畅想10Plus',
                  'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
                },
                {
                  'goods_id': '2',
                  'goods_name': '华为Mate30Pro',
                  'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
                },
                {
                  'goods_id': '3',
                  'goods_name': '华为nova5',
                  'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
                }
              ]
            }

          }]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                  'goods_id': '1',
                  'goods_name': 'iphone 11',
                  'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
                },
                {
                  'goods_id': '2',
                  'goods_name': 'iphone 11 pro',
                  'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
                },
                {
                  'goods_id': '3',
                  'goods_name': 'iphone 11 max pro',
                  'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
                }
              ]
            }

          }]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                  'goods_id': '1',
                  'goods_name': '小米8',
                  'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
                },
                {
                  'goods_id': '2',
                  'goods_name': '小米9',
                  'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
                },
                {
                  'goods_id': '3',
                  'goods_name': '小米10',
                  'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
                }
              ]
            }

          }]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                'goods_id': '1',
                'goods_name': 'oppor11',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
              },
              {
                'goods_id': '2',
                'goods_name': 'oppor12 pro',
                'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
              },
              {
                'goods_id': '3',
                'goods_name': 'oppor13 max pro',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
              }
              ]
            }

          }]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                'goods_id': '1',
                'goods_name': 'vivox11',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
              },
              {
                'goods_id': '2',
                'goods_name': 'vivox21 pro',
                'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
              },
              {
                'goods_id': '3',
                'goods_name': 'vivox31 max pro',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
              }
              ]
            }

          }]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                'goods_id': '1',
                'goods_name': '一加6',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
              },
              {
                'goods_id': '2',
                'goods_name': '一加6 pro',
                'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
              },
              {
                'goods_id': '3',
                'goods_name': '一加6T pro',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
              }
              ]
            }

          }]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '华为'
        }, {
          'id': '2',
          'name': '苹果'
        }, {
          'id': '3',
          'name': '小米'
        }, {
          'id': '4',
          'name': 'oppo'
        }, {
          'id': '5',
          'name': 'vivo'
        }, {
          'id': '6',
          'name': '一加'
        }, {
          'id': '7',
          'name': '魅族'
        }],

        'list': {
          'level1': [{
            'level2': {
              'type': '1',
              'list': [{
                'goods_id': '1',
                'goods_name': '魅族 16th',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/42958859/O1CN01M22xcQ2FJTJjNrdQd_!!0-saturn_solar.jpg_250x250.jpg'
              },
              {
                'goods_id': '2',
                'goods_name': '魅蓝e',
                'original_img': 'http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2838892713/O1CN016OdGAv1Vub6CiMSDO_!!0-item_pic.jpg_250x250.jpg'
              },
              {
                'goods_id': '3',
                'goods_name': '魅族pro 8',
                'original_img': 'http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2616970884/O1CN01mIKvLB1IOuh7fyELq_!!0-item_pic.jpg_250x250.jpg'
              }
              ]
            }

          }]
        }

      },

    ];
    console.log(index);

    console.log(list_left);
    switch (index) {
      case 0:
        list_left = list_left[0];
        break;
      case 1:
        list_left = list_left[1];
        break;
      case 2:
        list_left = list_left[2];
        break;
      case 3:
        list_left = list_left[3];
        break;
      case 4:
        list_left = list_left[4];
        break;
      case 5:
        list_left = list_left[5];
        break;
      case 6:
        list_left = list_left[6];
        break;
    }
    t.setData({
      'info.leftClass': list_left,
      'info.index': index,
      'info.id': id
    })
    console.log(t.data.info.leftClass);

  },

  // 选择分类信息
  queryClassInfo: function(e) {
    let t = this,
      current = e.currentTarget.dataset;
    console.log(current.index); // 0
    console.log(current.id); // 1
    console.log(t.data.info.index); // 0
    if (current.index != t.data.info.index) {
      t.getClassify(current.id, current.index);
    }
  },
})