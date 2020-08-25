import * as React from 'react';
import { View, Image } from 'remax/wechat';
import { PICTURE_URL, THIS_PICTURE } from '../../../../data';
import getImg from '../../../../service/get-img';
import './index.scss';

// 含有‘照片’‘帅哥’‘美女’
export const testGetDialog = value => {
  const regexp = /.*(照片|帅哥|美女).*/g;
  return regexp.test(value);
};
export const getDialog = value => {
  return new Promise((resolve, reject) => {
    const answer1 = {
      type: 'text',
      isAnswer: true,
      value: THIS_PICTURE
    };
    getImg()
      .then(imgs => {
        const i = Math.floor(Math.random() * imgs.length);
        const answer2 = {
          type: 'image',
          isAnswer: true,
          value: imgs[i].value
        };
        resolve([answer1, answer2]);
      })
      .catch(err => {
        resolve([answer1]);
      });
  });
};
export const testRenderDialog = props => {
  return props.type === 'image';
};
export const renderDialog = (props) => {
  const handleClickImage = () => {
    wx.previewImage({
      current: PICTURE_URL + props.value,
      urls: [PICTURE_URL + props.value]
    });
  };
  return (
    <View className={'list-item'}>
      <Image
        className={'picture'}
        src={PICTURE_URL + props.value}
        mode={'aspectFit'}
        onClick={handleClickImage}
      />
    </View>
  );
};
