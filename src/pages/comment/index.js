import * as React from 'react';
import { View, Button, Textarea } from 'remax/wechat';
import { WriteComment, WriteCommentDone } from '../../data';
import './index.scss';

export default () => {
  const [value, setValue] = React.useState('');
  const handleChange = React.useCallback((e) => {
    setValue(e.detail.value);
  }, [])
  const handleClickButton = React.useCallback(() => {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('comment').add({
      data: {
        value,
        date: new Date()
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [value]);
  return (
    <View className={'comment-page'}>
      <Textarea className={'textarea'} value={value} onInput={handleChange} placeholder={WriteComment} />
      <View className={'button-wrap'}>
      <Button className={'button'} onClick={handleClickButton}>{WriteCommentDone}</Button>
      </View>
    </View>
  );
};
