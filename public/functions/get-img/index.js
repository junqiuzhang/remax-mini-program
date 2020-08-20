// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let log, wxContext, resp;

  try {
    log = cloud.logger();
    wxContext = cloud.getWXContext();
    resp = await db.collection('picture').get();
  } catch (error) {
    log.error({ error });
  }

  return {
    response: resp.data,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  };
};
