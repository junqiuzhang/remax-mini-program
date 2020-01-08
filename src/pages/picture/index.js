import * as React from 'react';
import { View, Image, Button } from 'remax/wechat';
import { PictureUrl, PictureCount, NextPicture } from '../../data';
import './index.scss';

export default () => {
  const [pictures, setPictures] = React.useState([]);
  const [currentPicture, setCurrentPicture] = React.useState('');
  React.useEffect(() => {
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get-img',
      // 传给云函数的参数
      data: {},
    })
    .then(res => {
      setPictures(res.result.data);
    })
    .catch(console.error)
  }, [])
  const handleClickImage = React.useCallback(() => {
    wx.previewImage({
      current: PictureUrl + currentPicture,
      urls: [PictureUrl + currentPicture]
    })
  }, [currentPicture]);
  const handleClickButton = React.useCallback(() => {
    const i = Math.floor(Math.random() * pictures.length);
    setCurrentPicture(pictures[i].value);
  }, [pictures]);
  return (
    <View className={'picture-page'}>
      <View className={'picture-wrap'}>
        {currentPicture && <Image className={'picture'} src={PictureUrl + currentPicture} mode={'aspectFit'} onClick={handleClickImage}/>}
      </View>
      <View className={'button-wrap'}>
        <Button className={'button'} onClick={handleClickButton}>{NextPicture}</Button>
      </View>
    </View>
  );
};
