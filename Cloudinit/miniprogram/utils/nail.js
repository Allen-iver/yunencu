const util = require('./util.js');
let inputRegular = {
  nameRegular: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,//姓名正则
  phoneReqular: /^1[34578]\d{9}$/,//手机号正则
  idNumberReqular18: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//身份证18位
  idNumberReqular15: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/,//身份证15位
  bankCardNumberReqular: /^\d{19}$/g,//银行卡号
  userInputInfo: {
    // 姓名
    name: {
      info: null,
      flag: null,
      length: 500,
    },
    // 手机号
    phone: {
      info: null,
      flag: null,
    },
    idNumber: {
      info: null,
      flag15: null,
      flag18: null
    },
    // 地址
    side: {
      info: null,
      flag: null,
    },
    // 门牌号
    houseNumber: {
      info: null,
      flag: null
    },
    bankCardNumber: {
      info: null,
      flag: null
    },
    cardName: {
      info: null,
      flag: null
    },
    comment: {
      info: null,
      flag: null
    },
    bankName: {
      info: null,
      flag: null
    }
  },
  // 输入信息
  inputInfo(str, state) {
    let _this = this;
    switch (state) {
      case 'name':
        _this.inputName(str);
        break;
      case 'phone':
        _this.inputPhone(str);
        break;
        
      case 'idNumber':
      // 身份证号
        _this.inputIdNumber(str);
        break;
      case 'side':
        _this.inputSite(str);
        break;
      case 'bankCardNumber':
      // 银行卡号
        _this.inputCardNum(str);
        break;
      case 'cardName':
        // 开户行
        _this.inputCardName(str);
        break;
      case 'comment':
        //评论
        _this.inputComment(str);
        break;
      case 'houseNumber':
        _this.inputHouseNumber(str);
        break;
    }
    return _this.userInputInfo;
  },
  // 判断信息
  blurInfo(dom, state) {
    let _this = this;
    switch (state) {
      case 'name':
        _this.blurName(dom);
        break;
      case 'phone':
        _this.blurPhone(dom);
        break;
        // 身份证号
      case 'idNumber':
        _this.blurIdNumber(dom);
        break;
      case 'side':
        _this.blurSite(dom);
        break;
      case 'bankCardNumber':
        _this.blurCardNum(dom);
        break;
      case 'cardName':
        // 开户行
        _this.blurCardName(dom);
        break;
      case 'comment':
        //评论
        _this.blurComment(dom);
        break;
      case 'houseNumber':
        _this.blurHouseNumber(dom);
        break;
    }
  },
  // 输入门牌号
  inputHouseNumber: function (str) {
    let _this = this;
    let res = _this.userInputInfo.houseNumber;
    res.flag = util.functions.regularJudge(str);
    res.info = str;
  },
  // 判断门牌号
  blurHouseNumber: function (dom) {
    let flag = this.userInputInfo.houseNumber.flag;
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '门牌号不能为空', 1500);
    }
  },
  // 输入卡号
  inputCardNum: function (str) {
    let _this = this;
    let res = _this.userInputInfo.bankCardNumber;
    res.flag = util.functions.regularJudge(str, _this.bankCardNumberReqular);
    res.info = str;
  },
  // 判断卡号是否合法
  blurCardNum: function (dom) {
    let flag = this.userInputInfo.bankCardNumber.flag;
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '卡号不能为空', 1500);
    } else if (!flag) {
      util.functions.promptBoxStatus(dom, '卡号格式不正确', 1500);
    }
  },
  // 输入开户行
  inputCardName: function (str) {
    let _this = this;
    let res = _this.userInputInfo.cardName;
    res.flag = util.functions.regularJudge(str, _this.nameRegular);
    res.info = str;
  },
  // 判断开户行是否合法
  blurCardName: function (dom) {
    let flag = this.userInputInfo.cardName.flag;
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '开户行不能为空', 1500);
    } else if (!flag) {
      util.functions.promptBoxStatus(dom, '开户行格式不正确', 1500);
    }
  },
  // 输入地址
  inputSite: function (str) {
    let _this = this;
    let res = _this.userInputInfo.side;
    res.flag = util.functions.regularJudge(str);
    res.info = str;
  },
  // 输入地址是否合法
  blurSite: function (dom) {
    let flag = this.userInputInfo.side.flag;
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '地址不能为空', 1500);
    }
  },
  //输入身份证号
  inputIdNumber: function (str) {
    let _this = this;
    let res = _this.userInputInfo.idNumber;
    res.flag18 = util.functions.regularJudge(str, _this.idNumberReqular18);
    res.flag15 = util.functions.regularJudge(str, _this.idNumberReqular15);
    res.info = str;
  },
  // 判断身份证是否合法
  blurIdNumber: function (dom) {
    let _this = this;
    let flag15 = _this.userInputInfo.idNumber.flag15;
    let flag18 = _this.userInputInfo.idNumber.flag18;
    if (flag15 === null && flag18 === null) {
      util.functions.promptBoxStatus(dom, '身份证号不能为空', 1500);
    } else if (!flag15 && !flag18) {
      util.functions.promptBoxStatus(dom, '身份证号格式不正确', 1500);
    }
  },
  // 用户姓名
  inputName(str) {
    let _this = this;
    let res = _this.userInputInfo.name;
    res.flag = util.functions.regularJudge(str, _this.nameRegular, res.length);
    res.info = str;
  },
  // 用户姓名判断
  blurName(dom) {
    let _this = this;
    let lenth = _this.userInputInfo.length;
    let flag = _this.userInputInfo.name.flag;
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '用户名不能为空', 1500);
    } else if (!flag) {
      util.functions.promptBoxStatus(dom, '用户名应为数字,字母,汉子', 1500);
    } else if (flag > lenth) {
      util.functions.promptBoxStatus(dom, '用户名长度应为' + lenth + '位', 1500);
    }
  },
  // 输入手机号
  inputPhone: function (str) {
    let _this = this;
    let res = _this.userInputInfo.phone;
    res.flag = util.functions.regularJudge(str, _this.phoneReqular);
    res.info = str;
  },
  // 判断手机号是否合法
  blurPhone: function (dom) {
    let flag = this.userInputInfo.phone.flag;
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '手机号不能为空', 1500);
    } else if (!flag) {
      util.functions.promptBoxStatus(dom, '手机号格式不正确', 1500);
    }
  },
  // 输入评论
  inputComment: function (str) {
    let _this = this;
    let res = _this.userInputInfo.comment;
    res.flag = util.functions.regularJudge(str);
    res.info = str;
  },
  // 输入评论
  blurComment: function (dom) {
    let flag = this.userInputInfo.comment.flag;
    console.log(flag);
    if (flag === null) {
      util.functions.promptBoxStatus(dom, '评论不能为空', 1500);
    }
  }
}
module.exports = {
  inputRegular: inputRegular
}