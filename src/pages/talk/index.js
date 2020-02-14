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
    if (e.detail.value.length > 15) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setValue(e.detail.value);
  }
  const handleClickButton = async () => {
    const question = {
      isAnswer: false,
      value
    }
    setValue('');
    setList([...list, question]);
    setDisabled(true);

    var icon = '';
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

    const msg = await getMsg(value)
    const answer = {
      isAnswer: true,
      value: msg.answer || value.replace('吗', '')
    }
    setList([...list, question, answer]);
    setDisabled(false);
  }
  return (
    <View className={'talk-page'}>
      {
        snowIcon && <SnowFall icon={snowIcon} />
      }
      <View className={'list-wrap'}>
        {
          list.map(({ isAnswer, value }, i) => <View className={`list-item ${isAnswer && `answer`}`} key={i}>
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

