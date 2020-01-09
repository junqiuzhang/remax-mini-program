wx.cloud.init()
function get_msg(value) {
  return wx.cloud.callFunction({
    // 云函数名称
    name: 'get-msg',
    // 传给云函数的参数
    data: {
      message: value
    },
  })
  .then(res => res.result.response)
  .catch(console.error)
}
export default get_msg