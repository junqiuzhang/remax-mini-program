// 云函数入口文件
const path = require('path');
const cloud = require('wx-server-sdk');
const { NlpManager } = require('node-nlp');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true,
});

// 云函数入口函数
exports.main = async (event, context) => {
  let log, wxContext, manager, question, response;

  try {
    log = cloud.logger();
    // 微信上下文
    wxContext = cloud.getWXContext();
    // new nlp Object
    manager = new NlpManager({ languages: ['zh'] });
    // 加载数据
    await manager.load(path.resolve('./data.json'));
    // 获取参数
    question = event.message;
    // 返回参数
    response = await manager.process('zh', question);
    return {
      response,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID
    };
  } catch (error) {
    log.error({ error });
  }
};
