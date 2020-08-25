wx.cloud.init()
function get_msc() {
  return wx.cloud.callFunction({
      // 云函数名称
      name: 'get-msc',
      // 传给云函数的参数
      data: {},
    })
    .then(res => {
      console.log('get msc succeed');
      return res.result.response;
    })
    .catch(err => {
      console.error(err);
      return [];
    })
}
export default get_msc