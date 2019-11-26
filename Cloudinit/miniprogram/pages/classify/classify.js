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
    let list_left = [{
        'list_left': [{
          'id': '1',
          'name': '推荐分类'
        }, {
          'id': '2',
          'name': '母婴玩具'
        }, {
          'id': '3',
          'name': '数码家电'
        }, {
          'id': '4',
          'name': '营养保健'
        }, {
          'id': '5',
          'name': '钟表'
        }, {
          'id': '6',
          'name': '服饰奢品'
        }, {
          'id': '7',
          'name': '食品'
        }, {
          'id': '8',
          'name': '家具用品'
        }],

        'list': {
          'level1': [{
              'name': '配件1',
              'list': [{
                  'goods_id': '1',
                  'goods_name': '笔记本',
                  'original_img': '/images/pj01.png'
                },
                {
                  'goods_id': '2',
                  'goods_name': '电脑周边',
                  'original_img': '/images/pj02.png'
                }
              ]
            },
            {
              'name': '配件2',
              'list': [{
                  'goods_id': '1',
                  'goods_name': '书籍类',
                  'original_img': '/images/pj03.png'
                },
                {
                  'goods_id': '2',
                  'goods_name': '数码相机',
                  'original_img': '/images/pj04.png'
                },
                {
                  'goods_id': '3',
                  'goods_name': 'T恤',
                  'original_img': '/images/pj05.png'
                },
                {
                  'goods_id': '4',
                  'goods_name': '裤子',
                  'original_img': '/images/pj06.png'
                }
              ]
            }

          ]
        }

      },
      {
        'list_left': [{
          'id': '1',
          'name': '推荐分类'
        }, {
          'id': '2',
          'name': '母婴玩具'
        }, {
          'id': '3',
          'name': '数码家电'
        }, {
          'id': '4',
          'name': '营养保健'
        }, {
          'id': '5',
          'name': '钟表'
        }, {
          'id': '6',
          'name': '服饰奢品'
        }, {
          'id': '7',
          'name': '食品'
        }, {
          'id': '8',
          'name': '家具用品'
        }],

        'list': {
          'level1': [{
              'name': '配件1',
              'list': [{
                  'goods_id': '1',
                  'goods_name': '笔记本2',
                  'original_img': '/images/pj01.png'
                },
                {
                  'goods_id': '2',
                  'goods_name': '电脑周边2',
                  'original_img': '/images/pj02.png'
                }
              ]
            },
            {
              'name': '配件2',
              'list': [{
                  'goods_id': '1',
                  'goods_name': '书籍类2',
                  'original_img': '/images/pj03.png'
                },
                {
                  'goods_id': '2',
                  'goods_name': '数码相机2',
                  'original_img': '/images/pj04.png'
                },
                {
                  'goods_id': '3',
                  'goods_name': 'T恤2',
                  'original_img': '/images/pj05.png'
                },
                {
                  'goods_id': '4',
                  'goods_name': '裤子2',
                  'original_img': '/images/pj06.png'
                }
              ]
            }

          ]
        }

      }


    ];
    // console.log(index);

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
      case 7:
        list_left = list_left[7];
        break;
    }
    t.setData({
      'info.leftClass': list_left,
      'info.index': index,
      'info.id': id
    })
    // console.log(t.data.info.leftClass);
    console.log(t.data);
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