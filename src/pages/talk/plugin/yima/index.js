import * as React from 'react';
import { YIMA, YIMA_WATER } from '../../../../data';
import getDate from '../../../../service/get-date';
import './index.scss';
const MIN_TIME = 1000 * 60 * 60 * 24 * 7;
const state = {
  curDate: new Date(),
  preDate: new Date(),
  nexDate: new Date(),
  average: 0
};
getDate({ event: 'yima' }).then(data => {
  const dates = data.map(da => {
    return new Date(da.date);
  });
  dates.sort((a, b) => {
    return a < b ? 1 : -1;
  });
  let total = 0;
  for (let index = 0; index < dates.length - 1; index++) {
    const curDate = dates[index];
    const preDate = dates[index + 1];
    total += curDate.getTime() - preDate.getTime();
  }
  state.average = total / (dates.length - 1);
  state.preDate = dates[0];
  state.nexDate = new Date(state.preDate.getTime() + state.average);
});
// 含有‘姨妈’
export const testGetDialog = value => {
  const regexp = /.*(姨妈).*/g;
  return regexp.test(value);
};
export const getDialog = value => {
  return new Promise((resolve, reject) => {
    const message = YIMA.replace('{0}', state.preDate.getMonth() + 1)
      .replace('{1}', state.preDate.getDate())
      .replace('{2}', state.nexDate.getMonth() + 1)
      .replace('{3}', state.nexDate.getDate());
    const answer1 = {
      type: 'text',
      isAnswer: true,
      value: message
    };
    const answer2 = {
      type: 'text',
      isAnswer: true,
      value: YIMA_WATER
    };
    let dialog = [answer1];
    const diff = state.nexDate.getTime() - state.curDate.getTime();
    if (diff > 0 && diff < MIN_TIME) {
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
