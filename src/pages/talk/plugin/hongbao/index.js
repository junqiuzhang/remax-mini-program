import * as React from 'react';
import { View, Image } from 'remax/wechat';
import { SEND_HONG_BAO } from '../../../../data';
import HongBaoDialogImg from '../../../../../public/icons/hongbao-dialog.jpeg';
import HongBaoImg from '../../../../../public/icons/hongbao.jpeg';
import XiangPiChi from '../../../../../public/icons/xiangpichi.png';
import XiangPiChi2 from '../../../../../public/icons/xiangpichi2.jpeg';
import XiangDeMei from '../../../../../public/icons/xiangdemei.jpeg';
import XiangDeMei2 from '../../../../../public/icons/xiangdemei2.jpeg';
import XiangDeMei3 from '../../../../../public/icons/xiangdemei3.jpeg';
import XiangDeMei4 from '../../../../../public/icons/xiangdemei4.jpeg';
import './index.scss';
const ImgTotal = 6;
const ImgArray = [XiangPiChi, XiangPiChi2, XiangDeMei, XiangDeMei2, XiangDeMei3, XiangDeMei4];
// 含有‘红包’’奖励‘
export const testGetDialog = value => {
  const regexp = /.*(红包|奖励).*/g;
  return regexp.test(value);
};
export const getDialog = value => {
  return new Promise((resolve, reject) => {
    const answer1 = {
      type: 'text',
      isAnswer: true,
      value: SEND_HONG_BAO
    };
    const answer2 = {
      type: 'hongbao',
      isAnswer: true,
      value: ''
    };
    resolve([answer1, answer2]);
  });
};
export const testRenderDialog = props => {
  return props.type === 'hongbao';
};
class HongBao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHongBao: false,
      animationType: 'in',
      imgUrl: HongBaoImg,
    };
    this.canClick = true;
  }
  handleClickHongBao = () => {
    this.setState({ showHongBao: true });
  };
  handleExtendHongBao = () => {
    if (!this.canClick) {
      return;
    }
    this.canClick = false;
    this.setState({ animationType: 'out' });
    setTimeout(() => {
      const i = Math.floor(Math.random() * ImgTotal);
      this.setState({ animationType: 'in', imgUrl: ImgArray[i] });
    }, 2000);
    setTimeout(() => {
      this.setState({ animationType: 'out' });
    }, 6000);
    setTimeout(() => {
      this.canClick = true;
      this.setState({ showHongBao: false, animationType: 'in', imgUrl: HongBaoImg });
    }, 8000);
  };
  render() {
    const { showHongBao, animationType, imgUrl } = this.state;
    return (
      <>
        <Image
          className={'hongbao-dialog'}
          src={HongBaoDialogImg}
          mode={'aspectFit'}
          onClick={this.handleClickHongBao}
        />
        {showHongBao && (
          <View className={`hongbao-wrap bounce-${animationType}`}>
            <Image
              className={'hongbao'}
              src={imgUrl}
              mode={'aspectFit'}
              onClick={this.handleExtendHongBao}
            />
          </View>
        )}
      </>
    );
  }
}
export const renderDialog = props => {
  return <HongBao {...props} />;
};
