import React, { useState } from 'react';
import moment from 'moment';


const TimeComponent: React.FC = () => {
  // 时间更新
  let time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
  const [nowTime, setNowTime] = useState(time)
  setInterval(() => setNowTime(moment(new Date()).format('YYYY-MM-DD hh:mm:ss')), 1000);
  return <p>{nowTime}</p>
}



export default TimeComponent