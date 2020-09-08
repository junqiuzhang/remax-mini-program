wx.cloud.init()
function get_date(query) {
  return wx.cloud.callFunction({
      // 云函数名称
      name: 'get-date',
      // 传给云函数的参数
      data: {
        query
      },
    })
    .then(res => {
      console.log('get date succeed');
      return res.result.response;
    })
    .catch(err => {
      console.error(err);
      return [];
    })
}
export default get_date