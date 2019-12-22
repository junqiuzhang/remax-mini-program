import * as React from 'react';
import { View, Image, Button } from 'remax/wechat';
import { PictureUrl, PictureCount } from '../../data/index.ts';
import './index.scss';

export default () => {
  const [pictureName, setPictureName] = React.useState('1.jpg');
  const handleClickButton = React.useCallback(() => {
    const num = Math.floor(Math.random() * PictureCount) + 1;
    setPictureName(`${num}.jpg`);
  }, []);
  return (
    <View className={'app'}>
      <View className={'picture-wrap'}>
        <Image src={PictureUrl + pictureName} mode={'aspectFit'}/>
      </View>
      <View className={'button-wrap'}>
        <Button className={'button'} onClick={handleClickButton}>每日精选照片</Button>
      </View>
    </View>
  );
};
