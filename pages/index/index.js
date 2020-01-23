import {
  evaluate,
  Function
} from '../../eval5/eval5.js'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isRunning: false,
    code: `var data = [1,2,3,4,5,6];

var result = shuffle(data);

var idx = 1;
var timer = setInterval(function(){
  app.setData({
    result: result.join(','),
    idx: idx++
  });

  if(idx > 10) {
    clearInterval(timer);
    idx = 1;
    app.setData({
      isRunning: false
    });
  }
}, 200);

result;

function shuffle(array) {
  var length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  var index = -1
  var lastIndex = length - 1
  var result = [].concat(array)
  while (++index < length) {
    var rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    var value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

`,
    result: "",
    error: "",
    idx: 1,
    buttonText: "运行",
  },

  change(e) {
    this.setData({
      code: e.detail.value
    })
    return e.detail.value
  },

  run: function () {
    this.setData({
      error: "",
      result: "",
      isRunning: true,
    });
    // 获取到最后一个表达式值
    try {
      const result = evaluate(this.data.code, {
        app: this,
        Math,
        setInterval,
        clearInterval,
        console
      });
      console.log(result);
    } catch (e) {
      console.log(e);
      this.setData({
        isRunning: false,
        error: e.message
      })
    }
  },

  onLoad: function () {
    const func = new Function('a', 'b', 'return a+b');
    console.log(func(100, 200));
  }
})