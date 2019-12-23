module.exports = {
  pages: [
    'pages/picture/index',
    'pages/comment/index',
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
        pagePath: 'pages/picture/index',
        iconPath: 'icons/picture.png',
        selectedIconPath: 'icons/selected-picture.png',
        text: '图片'
      },
      {
        pagePath: 'pages/comment/index',
        iconPath: 'icons/comment.png',
        selectedIconPath: 'icons/selected-comment.png',
        text: '说点什么～'
      }
    ]
  }
};
