import * as React from 'react';
import { Text, View, Button, Input } from 'remax/wechat';
import { SNOW_ICON, SEND } from '../../data';
import getMsg from '../../service/get-msg';
import SnowFall from '../../components/snow';
import * as Question from './plugin/question/index';
import * as Picture from './plugin/picture/index';
import './index.scss';
const pipeArray = [Question, Picture];
async function getDialogPipe(value) {
  // 特殊
  for (let index = 0; index < pipeArray.length; index++) {
    const pipe = pipeArray[index];
    if (pipe.testGetDialog(value)) {
      const answers = await pipe.getDialog(value);
      debugger
      return answers;
    }
  }
  // 默认
  const msg = await getMsg(value);
  const answer = {
    type: 'text',
    isAnswer: true,
    value: msg.answer
  };
  return [answer];
}
function renderDialogPipe(props, i) {
  // 特殊
  for (let index = 0; index < pipeArray.length; index++) {
    const pipe = pipeArray[index];
    if (pipe.testRenderDialog(props)) {
      const answer = pipe.renderDialog(props, i);
      return answer;
    }
  }
  // 默认
  const { type, isAnswer, value } = props;
  const answer = (
    <View
      className={`list-item ${
        isAnswer ? `answer bounce-in-left` : `bounce-in-right`
      }`}
      key={i}
    >
      <Text className={'text'}>{value}</Text>
    </View>
  );
  return answer;
}
export default () => {
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  // snow
  const [snowIcon, setSnowIcon] = React.useState('');

  const handleChange = React.useCallback(e => {
    if (e.detail.value.trim().length < 1 || e.detail.value.length > 15) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setValue(e.detail.value);
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
  const setSnow = React.useCallback(value => {
    for (const key in SNOW_ICON) {
      if (SNOW_ICON.hasOwnProperty(key)) {
        const val = SNOW_ICON[key];
        if (value.includes(key)) {
          setSnowIcon(val);
          return;
        }
      }
    }
  }, []);
  const setDialog = dialog => {
    setValue('');
    setList([...list, ...dialog]);
    scrollToBottom();
  };
  const handleClickButton = async () => {
    setDisabled(true);

    // snow
    setSnow(value);

    // dialog
    const question = {
      type: 'text',
      isAnswer: false,
      value
    };
    setDialog([question]);
    const answers = await getDialogPipe(value);
    setDialog([question, ...answers]);
  };
  return (
    <View className={'talk-page'}>
      {snowIcon && <SnowFall icon={snowIcon} />}
      <View className={'list-wrap'}>
        {list.map((dialog, i) => renderDialogPipe(dialog, i))}
      </View>
      <View className={'bottom-wrap'}>
        <Input className={'input'} value={value} onInput={handleChange} />
        <Button
          className={`button ${disabled && `disabled`}`}
          disabled={disabled}
          onClick={handleClickButton}
        >
          {SEND}
        </Button>
      </View>
    </View>
  );
};
