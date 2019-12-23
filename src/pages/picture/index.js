import * as React from 'react';
import { View, Image, Button } from 'remax/wechat';
import { PictureUrl, PictureCount, NextPicture } from '../../data';
import './index.scss';

export default () => {
  const [currentPicture, setCurrentPicture] = React.useState(`${Math.floor(Math.random() * PictureCount)}.jpg`);
  const handleClickImage = React.useCallback(() => {
    wx.previewImage({
      current: PictureUrl + currentPicture,
      urls: [PictureUrl + currentPicture]
    })
  }, [currentPicture]);
  const handleClickButton = React.useCallback(() => {
    const i = Math.floor(Math.random() * PictureCount);
    setCurrentPicture(`${i}.jpg`);
  }, []);
  return (
    <View className={'picture-page'}>
      <View className={'picture-wrap'}>
        <Image className={'picture'} src={PictureUrl + currentPicture} mode={'aspectFit'} onClick={handleClickImage}/>
      </View>
      <View className={'button-wrap'}>
        <Button className={'button'} onClick={handleClickButton}>{NextPicture}</Button>
      </View>
    </View>
  );
};
