wx.cloud.init()
function get_img() {
  return wx.cloud.callFunction({
    // 云函数名称
    name: 'get-img',
    // 传给云函数的参数
    data: {},
  })
  .then(res => res.result.response)
  .catch(console.error)
}
export default get_img