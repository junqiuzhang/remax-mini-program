import * as React from 'react';
import { Text, View, Button, Input } from 'remax/wechat';
import { Send } from '../../data';
import SnowFall from '../../components/snow';
import { SnowIcon } from '../../components/snow/constants';
import getMsg from './get-msg';
import './index.scss';

function getDialogPipe(value) {
  return new Promise((resolve, reject) => {
    // 含有‘吗’或‘？’
    if (value.includes('吗') || value.includes('？')) {
      setTimeout(() => {
        resolve(value.replace('吗', '').replace('？', ''));
      }, 500);
      return;
    }
    // 默认
    getMsg(value).then(msg => {
      resolve(msg.answer);
    });
    return;
  });
}
function renderDialogPipe(props) {
  return <Text className={'text'}>{props}</Text>;
}
export default () => {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [snowIcon, setSnowIcon] = React.useState('');
  const handleChange = React.useCallback(e => {
    if (e.detail.value.trim().length < 1 || e.detail.value.length > 15) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setValue(e.detail.value);
    }
  }, []);
  const setDialog = (ques, ans) => {
    const question = {
      isAnswer: false,
      value: ques
    };
    const answer = {
      isAnswer: true,
      value: ans
    };
    let nList = [];
    if (ans) {
      nList = [...list, question, answer];
    } else {
      nList = [...list, question];
    }
    setValue('');
    setList(nList);
    scrollToBottom();
  };
  const setSnow = React.useCallback(value => {
    let icon = '';
    Object.keys(SnowIcon).forEach(val => {
      if (value.includes(val)) {
        icon = SnowIcon[val];
      }
    });
    if (icon) {
      setSnowIcon(icon);
      setTimeout(() => {
        setSnowIcon('');
      }, 10000);
    }
  }, []);
  const scrollToBottom = React.useCallback(() => {
    const query = wx.createSelectorQuery();
    query.selectViewport().scrollOffset();
    query.select('.list-wrap').boundingClientRect();
    query.exec(function (res) {
      const top = res[0].scrollHeight || 999;
      wx.pageScrollTo({
        scrollTop: top,
        duration: 300
      });
    });
  }, []);
  const handleClickButton = async () => {
    setDisabled(true);
    setDialog(value);

    // snow特效
    setSnow(value);

    const dialog = await getDialogPipe(value);
    setDialog(value, dialog);
  };
  return (
    <View className={'talk-page'}>
      {snowIcon && <SnowFall icon={snowIcon} />}
      <View className={'list-wrap'}>
        {list.map(({ isAnswer, value }, i) => (
          <View
            className={`list-item ${
              isAnswer ? `answer bounce-in-left` : `bounce-in-right`
            }`}
            key={i}
          >
            {renderDialogPipe(value)}
          </View>
        ))}
      </View>
      <View className={'bottom-wrap'}>
        <Input className={'input'} value={value} onInput={handleChange} />
        <Button
          className={`button ${disabled && `disabled`}`}
          disabled={disabled}
          onClick={handleClickButton}
        >
          {Send}
        </Button>
      </View>
    </View>
  );
};
