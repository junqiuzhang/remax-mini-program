import * as React from 'react';
import { Text, View, Button, Input } from 'remax/wechat';
import { Send } from '../../data';
import SnowFall from '../../components/snow';
import { SnowIcon } from '../../components/snow/constants';
import getMsg from './get-msg';
import './index.scss';

export default () => {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [snowIcon, setSnowIcon] = React.useState('');
  const handleChange = (e) => {
    if (e.detail.value.trim().length < 1 || e.detail.value.length > 15) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setValue(e.detail.value);
    }
  }
  const setDialog = (ques, ans) => {
    const question = {
      isAnswer: false,
      value: ques
    }
    const answer = {
      isAnswer: true,
      value: ans
    }
    let nList = [];
    if (ans) {
      nList = [...list, question, answer];
    } else {
      nList = [...list, question];
    }
    setValue('');
    setList(nList);
  }
  const setSnow = (value) => {
    let icon = '';
    Object
    .keys(SnowIcon)
    .forEach(val => {
      if (value.includes(val)) {
        icon = SnowIcon[val]
      }
    })
    if (icon) {
      setSnowIcon(icon);
      setTimeout(() => {
        setSnowIcon('');
      }, 10000)
    }
  }
  const handleClickButton = async () => {
    setDisabled(true);
    setDialog(value);
    // snow特效
    setSnow(value);

    if (value.includes('吗') || value.includes('？')) {
      setDialog(value, value.replace('吗', '').replace('？', ''));
      return;
    }

    const msg = await getMsg(value)
    if (msg && msg.answer) {
      setDialog(value, msg.answer);
    }
  }
  return (
    <View className={'talk-page'}>
      {
        snowIcon && <SnowFall icon={snowIcon} />
      }
      <View className={'list-wrap'}>
        {
          list.map(({ isAnswer, value }, i) => <View className={`list-item ${isAnswer ? `answer bounce-in-left` : `bounce-in-right`}`} key={i}>
            <Text className={'text'}>{value}</Text>
          </View>)
        }
      </View>
      <View className={'bottom-wrap'}>
        <Input className={'input'} value={value} onInput={handleChange}/>
        <Button className={`button ${disabled && `disabled`}`} disabled={disabled} onClick={handleClickButton}>{Send}</Button>
      </View>
    </View>
  );
};

