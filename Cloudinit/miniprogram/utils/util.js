const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
class functions {
  // 获取当前页面url
  getTranspond(app) {
    let t = this;
    let ui = app.user_info,
      pages = getCurrentPages(), //获取加载的页面
      url = pages[pages.length - 1].route; //获取当前页面url
    return { url: '/' + url + '?user_id=' + ui.user_id, name: ui.transpondTitle };
  }
  // 正在加载
  underLoad(text) {
    text = '加载中' || text;
    wx.showLoading({
      title: text,
      mask: true,
    })
  }
  // 截取字符串替换...
  singleInstead(text, max, point) {
    try {
      max === undefined ? max = 12 : max;
      point === undefined ? point = '...' : point;
      if (text.length > max) {
        text = text.substring(0, max) + point;
      }
      return text;
    } catch (e) { }
  }
  //正则判断text需要判断的字符串,regular为公式,max为最大输入数
  regularJudge(text, regular, max) {
    if (text != null && text != '') {
      if (text.length < max || max === undefined) {
        if (regular === undefined) {
          return true;
        } else if (regular.test(text)) {
          return true;
        } else {
          return false;
        }
      } else {
        return text.length
      }
    } else {
      return null;
    }
  }
  /**
   * 提示框状态
   */
  promptBoxStatus(t, msg, time) {
    clearTimeout(t.data.timeout);
    t.setData({
      msg: msg,
      promptState: true,
      timeout: setTimeout(function () { t.setData({ promptState: false }) }, time)
    })
    
  }
  /**
  * 正在加载中
  */
  underLoad(text) {
    text === undefined ? text = '加载中' : text
    wx.showLoading({
      title: text,
      mask: true,
    })
  }
  // 随机数组
  randomArray(list) {
    let random, temp,i,item;
    for(i = 0 ; i < list.length ; i ++){
      random = Math.floor(Math.random() * (i + 1));
      temp = list[i];
      list[i] = list[random];
      list[random] = temp;
    }
    return list;
  }
  // 倒计时
  countDown(time, dom) {
    let t = this;
    //时间差  
    let timeDifference = Math.abs(t.timeDifference(time));
    //定义变量 d,h,m,s保存倒计时的时间  
    let d, h, m, s;
    if (timeDifference >= 0) {
      d = Math.floor(timeDifference / 1000 / 60 / 60 / 24);
      h = Math.floor(timeDifference / 1000 / 60 / 60 % 24);
      m = Math.floor(timeDifference / 1000 / 60 % 60);
      s = Math.floor(timeDifference / 1000 % 60);
    }
    let countDown = d + "天" + (h < 10 ? '0' + h : h) + "时" + (m < 10 ? '0' + m : m) + "分" + (s < 10 ? '0' + s : s) + "秒"
    dom.setData({
      'info.countDown': countDown,
      'info.timeout': setTimeout(function () { t.countDown(time, dom) }, 1000),
      'info.down': d + h + m + s
    })
    //递归每秒调用countTime方法，显示动态时间效果  
  }
  // 获取时间差
  timeDifference(time) {
    let t = this,
    
    current = t.currentTime();
    return new Date(t.formatTime(parseInt(time), "Y-M-D h:m:s")).getTime() - new Date(current).getTime();   //时间差的毫秒数  
  }
  // 获取当前时间
  currentTime() {
    let getTime = new Date();
    return getTime.toLocaleDateString().replace(/\//g, "-") + " " + getTime.toTimeString().substr(0, 8);
  }

  //数据转化  
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  /** 
   * 时间戳转化为年 月 日 时 分 秒 
   * number: 传入时间戳 
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
  */
  formatTime(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date;
    if((number+'').length == 10){
      date = new Date(number * 1000);
    }else{
      date = new Date(number);
    }
    
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }
}
module.exports = {
  formatTime: formatTime,
  functions: new functions(),
}
