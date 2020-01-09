module.exports = {
  pages: [
    'pages/talk/index',
    'pages/picture/index',
  ],
  window: {
    navigationBarTitleText: 'Love zxz',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#ffffff'
  },
  tabBar: {
    color: '#cdcdcd',
    selectedColor: '#18b507',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/talk/index',
        iconPath: 'icons/talk.png',
        selectedIconPath: 'icons/selected-talk.png',
        text: '聊天机器人'
      },
      {
        pagePath: 'pages/picture/index',
        iconPath: 'icons/picture.png',
        selectedIconPath: 'icons/selected-picture.png',
        text: '照片'
      },
    ]
  }
};
