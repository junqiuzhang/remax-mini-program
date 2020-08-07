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
  } catch (error) {
    log.error({ from: 'log error', error });
  }

  try {
    wxContext = cloud.getWXContext();
  } catch (error) {
    log.error({ from: 'get wxContext error', error });
  }

  try {
    manager = new NlpManager({ languages: ['zh'] });
    await manager.load(path.resolve('./data.json'));
  } catch (error) {
    log.error({ from: 'manager create or load error', error });
  }

  try {
    question = event.message;
  } catch (error) {
    log.error({ from: 'get param error', error });
  }

  try {
    response = await manager.process('zh', question);
  } catch (error) {
    log.error({ from: 'manager process error', error });
  }

  try {
    regQuestion = new RegExp(question.split('').join('\\w+'));
    respAnswer = response.answers.find(({ answer }) => {
      const regAnswer = new RegExp(answer.split('').join('\\w+'));
      return (
        regQuestion.test(answer) ||
        regAnswer.test(question) ||
        question.includes(answer) ||
        answer.includes(question)
      );
    });
  } catch (error) {
    log.error({ from: 'answer select error', error });
  }

  try {
    response.answer = (respAnswer && respAnswer.answer) || '😂';
  } catch (error) {
    log.error({ from: 'set answer error', error });
  }

  return {
    response,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  };
};
