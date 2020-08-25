import * as React from 'react';
import { View, Audio } from 'remax/wechat';
import { MUSIC_URL, THIS_MUSIC, WHICH_MUSIC } from '../../../../data';
import getMsc from '../../../../service/get-msc';
import './index.scss';

const state = {
  musicList: []
};
getMsc()
.then(musics => {
  state.musicList = musics;
})
// 含有‘歌’ 歌名
export const testGetDialog = value => {
  for (let i = 0; i < state.musicList.length; i++) {
    const music = state.musicList[i];
    if (value.includes(music.name)) {
      return i;
    }
  }
  if (value.includes('歌')) {
    return -1;
  }
  return 0;
};
export const getDialog = (value, testResult) => {
  return new Promise((resolve, reject) => {
    if (testResult === -1) {
      const answer1 = {
        type: 'text',
        isAnswer: true,
        value: THIS_MUSIC
      };
      const answer2 = {
        type: 'text',
        isAnswer: true,
        value: state.musicList.map(music => `${music.name}`) + WHICH_MUSIC
      };
      resolve([answer1, answer2])
    } else {
      const answer = {
        type: 'music',
        value: state.musicList[testResult]
      };
      resolve([answer])
    }
  });
};
export const testRenderDialog = props => {
  return props.type === 'music';
};
class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }
  componentDidMount() {
    const { value } = this.props;
    wx.cloud.downloadFile({
      fileID: MUSIC_URL + value,
    }).then(music => {
      this.setState({
        url: music.tempFilePath
      });
    })
  }
  render() {
    const { name } = this.props;
    const { url } = this.state;
    if (!this.state.url) {
      return false;
    }
    return (
      <View className={`list-item answer bounce-in-left}`}>
        <Audio
          className={'music'}
          controls={true}
          src={url}
          name={name}
          bindError={console.log}
        />
      </View>
    );
  }
}
export const renderDialog = (props, i) => {
  return <Music {...props.value} key={i}/>
};
