wx.cloud.init();
/**
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 */
var intersection = function (str1, str2) {
  var map = new Map();
  var i;
  var len1 = str1.length;
  var len2 = str2.length;
  var res = 0;
  for (i = 0; i < len1; i++) {
    map.set(str1[i], 1);
  }
  for (i = 0; i < len2; i++) {
    if (map.get(str2[i])) {
      res++;
    }
  }
  return res;
};
function get_msg(value) {
  return wx.cloud
    .callFunction({
      // 云函数名称
      name: 'get-msg',
      // 传给云函数的参数
      data: {
        message: value
      }
    })
    .then(res => {
      let { answer, answers } = res.result.response;
      let like = 0;
      for (let i = 0; i < answers.length; i++) {
        const element = answers[i];
        const nLike = intersection(value, element.answer);
        if (like < nLike) {
          answer = element.answer;
          like = nLike;
        }
      }
      if (!answer) {
        return {
          answer: '大人稍等，小的忙不过来了~'
        }
      }
      return {
        answer
      }
    })
    .catch(console.error);
}
export default get_msg;
