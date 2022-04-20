import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Card, message } from 'antd';
import styles from './index.less';

import { Calendar } from 'antd';
import moment from 'moment';
import TimeComponent from '../TimeComponent';

const CalendarTender: any = ({ setCalendarSearchTime, setCalendarSearch, tenderDateArr }: any) => {
  const dateCellRender = (value: any) => {
    // 每次读取的时间
    let reverst = moment(value).format('YYYY-MM-DD');
    // 获取获取当天
    let nowDate = moment(new Date()).format('YYYY-MM-DD');

    const render = () => {
      if (tenderDateArr?.includes(reverst)) {
        if (nowDate === reverst) {
          return (
            <div style={{ backgroundColor: '#C7D9F1', color: '#FAAD14', border: 'solid 1px' }}>
              {value.date()}
            </div>
          );
        } else {
          return <div style={{ backgroundColor: '#C7D9F1' }}>{value.date()}</div>;
        }
      } else if (nowDate == reverst) {
        return <div style={{ color: '#0170fe', border: 'solid 1px' }}>{value.date()}</div>;
      } else {
        return <div>{value.date()}</div>;
      }
    };
    return <>{render()}</>;
  };

  const headerRender: React.FC = ({ value, onChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option className="month-item" key={`${index}`}>
          {months[index]}
        </Select.Option>,
      );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <>
        <Row>
          <Col span={12}>
            <TimeComponent />
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={String(month)}
              onChange={(selectedMonth) => {
                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10));
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </>
    );
  };

  // 存在bug:切换年份或月份时提示错误
  const handleSelect = (value: any) => {
    // 之后在这里点击跳转
    let handleData = moment(value).format('YYYY-MM-DD');

    if (tenderDateArr.includes(handleData)) {
      setCalendarSearchTime(handleData);
      setCalendarSearch(true);
    } else message.info('所选日期无投标项目开放！');
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        fullscreen={false}
        onSelect={handleSelect}
        dateFullCellRender={dateCellRender}
        headerRender={headerRender}
      />
    </div>
  );
};

export default CalendarTender;
