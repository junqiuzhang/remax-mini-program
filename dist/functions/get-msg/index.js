// 云函数入口文件
const path = require('path');
const cloud = require('wx-server-sdk')
const { NlpManager } = require('node-nlp')

const zh = 'zh'
const manager = new NlpManager({ languages: [zh] });
manager.load(path.resolve('./data.json'));

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // const fileID = 'cloud://love-zxz.6c6f-love-zxz-1300970134/data/data.json'
  // const { fileContent } = await cloud.downloadFile({ fileID })
  // const fileData = fileContent.toString('utf8')
  // manager.import(fileData)

  const response = await manager.process(zh, event.message)
  
  // const log = cloud.logger()
  // log.info({
  //   fileID,
  //   fileContent,
  //   fileData
  // })
  
  return {
    response,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}