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
  let log, wxContext, manager, question, response, regQuestion, respAnswer;

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
    // 计算回答
    response = await manager.process('zh', question);
    // 问题RegExp
    regQuestion = new RegExp(question.split('').join('.*'));
    // 最优回答
    respAnswer = response.answers.find(({ answer }) => {
      // 回答RegExp
      const regAnswer = new RegExp(answer.split('').join('.*'));
      return (
        regQuestion.test(answer) ||
        regAnswer.test(question) ||
        question.includes(answer) ||
        answer.includes(question)
      );
    });
    // 返回参数
    if (!response.answer) {
      response.answer = response.answers[0];
    }
    if (!response.answer) {
      response.answer = '😂';
    }
  } catch (error) {
    log.error({ error });
  }

  return {
    response,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  };
};
