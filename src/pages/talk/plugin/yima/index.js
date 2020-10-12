import * as React from 'react';
import { YIMA, YIMA_WATER } from '../../../../data';
import getDate from '../../../../service/get-date';
import './index.scss';
const MIN_TIME = 1000 * 60 * 60 * 24 * 7;
class Yima {
  constructor(props) {
    const now = new Date();
    this.curDate = now;
    this.curDate = now;
    this.nexDate = now;
    this.average = 0;
    getDate({ event: 'yima' }).then(this.initDate);
  }
  initDate = datas => {
    const dates = datas.map(data => {
      return new Date(data.date);
    });
    dates.sort((a, b) => {
      return a < b ? 1 : -1;
    });
    this.dates = dates;
    this.average = this.calcAverage(dates);
    this.nexDate = new Date(this.dates[0].getTime() + this.average);
  }
  calcAverage = (dates) => {
    let total = 0;
    for (let index = 0; index < dates.length - 1; index++) {
      const curDate = dates[index];
      const preDate = dates[index + 1];
      total += curDate.getTime() - preDate.getTime();
    }
    return total / (dates.length - 1);
  }
}
const YimaState = new Yima();
// 含有‘姨妈’
export const testGetDialog = value => {
  const regexp = /.*(姨妈).*/g;
  return regexp.test(value);
};
export const getDialog = value => {
  return new Promise((resolve, reject) => {
    const timesMatchResult = value.match(/(上+)次/);
    const times = Math.min(timesMatchResult ? timesMatchResult[1].length : 1, YimaState.dates.length);
    const timesStr = new Array(times + 1).join('上');
    const timesDate = YimaState.dates[times - 1];
    const message = YIMA.replace('{0}', timesStr)
      .replace('{1}', timesDate.getMonth() + 1)
      .replace('{2}', timesDate.getDate())
      .replace('{3}', YimaState.nexDate.getMonth() + 1)
      .replace('{4}', YimaState.nexDate.getDate());
    const answer1 = {
      type: 'text',
      isAnswer: true,
      value: message
    };
    let dialog = [];
    dialog.push(answer1);
    const preDiff = YimaState.curDate.getTime() - YimaState.dates[0].getTime();
    const nexDiff = YimaState.nexDate.getTime() - YimaState.curDate.getTime();
    if (preDiff < MIN_TIME || nexDiff < MIN_TIME) {
      const answer2 = {
        type: 'text',
        isAnswer: true,
        value: nexDiff < MIN_TIME ? YIMA_WATER : YIMA_WATER.split('快').join('')
      };
      dialog.push(answer2);
    }
    resolve(dialog);
  });
};
export const testRenderDialog = props => {
  return false;
};
export const renderDialog = props => {
  return false;
};
