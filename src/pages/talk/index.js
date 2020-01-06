import * as React from 'react';
import { Text, View, Button, Input } from 'remax/wechat';
import { Send } from '../../data';
import reply from './reply';
import './index.scss';

export default () => {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const handleChange = (e) => {
    if (e.detail.value.length > 15) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setValue(e.detail.value);
  }
  const handleClickButton = () => {
    setList([...list, value]);
    setValue('');
    setDisabled(true);
    setTimeout(() => {
      setList([...list, value, reply(value)]);
      setDisabled(false);
    }, 300);
  }
  return (
    <View className={'talk-page'}>
      <View className={'list-wrap'}>
        {
          list.map((text, i) => <View className={'list-item'} key={i}>
            <Text className={'text'}>{text}</Text>
          </View>)
        }
      </View>
      <View className={'bottom-wrap'}>
        <Input className={'input'} value={value} onInput={handleChange}/>
        <Button className={`button ${disabled ? 'disabled' : ''}`} disabled={disabled} onClick={handleClickButton}>{Send}</Button>
      </View>
    </View>
  );
};

