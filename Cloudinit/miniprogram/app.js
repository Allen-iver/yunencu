//app.js
App({
  //用户信息
  user_info: {
    avatarUrl: null, //用户头像
    nickName: null, //用户姓名
    user_id: null, //用户id
    open_id: null, //用户openid
    gender: null // 用户性别
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloudenu-yq6lz',
        traceUser: true,
      })
    }

    this.globalData = {}


  },


  onGetOpenid: function () {
    // 获取数据库引用
    const db = wx.cloud.database();
    const userListDB = db.collection('userlists');
    let t = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        t.user_info.open_id = res.result.openid;

        // 在数据库存取用户信息
        userListDB.where({
          _openid: t.user_info.open_id // 填入当前用户 openid
        }).get({
          success: function (res) {
            console.log(res);
            let userInfos = res.data;
            console.log(userInfos)
            if (userInfos && userInfos.length > 0) {
              let user = userInfos[0];
              if (user && user.name) {
                console.log('用户已存入数据库');
              }
            } else {
              t.saveuserinfo();
            }
          }

        })


      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  // 授权方法
  userLogin_im(share_one, flag) {
    share_one = share_one || 0;
    let t = this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (data) {
            t.onGetOpenid();
            console.log(data);
            let au = t.user_info;
            let user_res = data.userInfo;
            au.nickName = user_res.nickName;
            au.avatarUrl = user_res.avatarUrl;
            au.gender = user_res.gender;
            
            !flag ? wx.reLaunch({
              url: '/pages/home/home',
            }) : dom.setData({
              loadFlag: false
            })

          },
          //当授权被拒绝调用提示，提醒用户操作
          fail: e => {
            wx.showModal({
              title: '提示',
              content: '若不授权登录则无法使用本程序中重要功能',
              cancelText: '取消授权',
              confirmText: '确认授权',
              success: res => {
                //确认授权回调授权
                if (res.confirm) {
                  wx.openSetting({
                    success: data => {
                      t.userLogin_im(share_one, flag);
                    }
                  })
                }
              }
            })
          }
        })
      }
    })


  },

  // 保存用户信息
  saveuserinfo() {
    const db = wx.cloud.database();
    const userListDB = db.collection('userlists');
    let t = this;
    // userListDB.doc('_openid').set({
    userListDB.add({
      data: {
        nickName: t.user_info.nickName,
        avatarUrl: t.user_info.avatarUrl,
        gender: t.user_info.gender
      }
    }).then(res => {
      // app.showTips('注册成功');
      // app.promptBoxStatus(t, '注册成功', 1000);
      console.log('入库成功');
    })
  },

})
