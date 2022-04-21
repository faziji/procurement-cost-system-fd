import React, { useState } from 'react';
import moment from 'moment';

const Countdown: any = (props: any) => {
  const endTime = props.endTime;
  const startTime = props.startTime;

  // 开始时间在第二天以后
  const nowTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  let startTimeDay = startTime?.slice(8, 10);
  let nowTimeDay: any = String(nowTime?.slice(8, 10));
  let subTimeTime = startTimeDay - nowTimeDay;

  console.log('111111111111111', subTimeTime);

  const [remainTime, setRemainTime] = useState('');
  setInterval(() => {
    let nowTamp = new Date().valueOf();
    // 结束时间戳
    let endTamp = moment(endTime).valueOf();
    const nowTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
    // console.log('当前时间戳', nowTamp);
    // console.log('结束时间戳', endTamp);

    // 时间戳差值：结束时间 - 当前时间
    let subTamp = endTamp - nowTamp;
    // 时间戳差值：开始时间晚于当天
    let subLateTamp = startTime - nowTamp;

    console.log('插值', subTamp);
    // 转化为具体时差:获取天时分秒的时间戳
    let day_ms = 24 * 60 * 60 * 1000;
    let hour_ms = 60 * 60 * 1000;
    let min_ms = 60 * 1000;
    let ss_ms = 1000;

    let hour = parseInt(String((subTamp % day_ms) / hour_ms), 10);
    let min = parseInt(String((subTamp % hour_ms) / min_ms), 10);
    let ss = parseInt(String((subTamp % min_ms) / ss_ms), 10);
    // let ss = parseInt(String((subTamp % ss_ms) / 1000), 10);

    // 未开始但不在当天
    // if (startTime) {
    //   setRemainTime(startTime);
    // }
    // // 活动已结束
    // else
    // 活动已结束
    if (subTamp < 0) {
      setRemainTime('活动已结束');
    }
    // } else if (subDateTime > 0) {
    //   setRemainTime(startTime);
    // }
    else {
      setRemainTime(`倒计时：${subTimeTime}天${hour}时${min}分${ss}秒`);
      // setRemainTime('倒计时：' + subTamp);
    }
  }, 1000);
  return <p title={remainTime?.includes('秒') ? '投标截止时间' : '活动已结束'}>{remainTime}</p>;
};

export default Countdown;

// 未开始
// 正在倒计时
// 已结束

// 结束时间 - 当前时间
// 月 为负

// =》
// 判断是否开始/结束
// 转化为时间戳 正数：倒计时
// 转化为时间戳 负数：已结束
