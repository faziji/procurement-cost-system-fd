import React, { memo, useEffect, useState } from 'react';
import styles from './index.less';
import CalendarTender from '../CalendarTender';
import { Card, Col, Divider, message, Row, Typography } from 'antd';
import FormNormalLogin from '../FormNormalLogin';
import {
  CalendarOutlined,
  ContainerOutlined,
  DoubleLeftOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import ResourceAnnounce from './ResourceAnnounce';
import ResourceItemElemMore from './ResourceItemElemMore';
import { getPurchaseAnnouncementList } from '@/services/resource/api';
import { history } from 'umi';
import { getUserInfo } from '@/utils';
import moment from 'moment';

const JumpSystemLine = () => {
  const handleClick = (route: any) => {
    // 已登录
    if (getUserInfo() && getUserInfo() != 'undefined') {
      history.push(route);
    } else {
      message.info('请登录！');
    }
  };

  return (
    <Row>
      <Col span={8}>
        <div onClick={() => handleClick('/my')} className={styles.loginFormEntry1}>
          <div className={styles.entryWrapper}>
            <img
              className={styles.imagePic}
              src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-gys.png"
              alt=""
            />
            <p>我的信息</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div onClick={() => handleClick('/myAttention')} className={styles.loginFormEntry2}>
          <div className={styles.entryWrapper}>
            <img
              className={styles.imagePic}
              src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ps.png"
              alt=""
            />
            <p>我的关注</p>
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div onClick={() => handleClick('/myTender')} className={styles.loginFormEntry3}>
          <div className={styles.entryWrapper}>
            <img
              className={styles.imagePic}
              src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png"
              alt=""
            />
            <p>我的投标</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const WelcomeMain: any = () => {
  // 是否展示login
  const [loginCardVisiable, setLoginCardVisiable] = useState(true);
  // 是否是日历点击搜索跳转的内容
  const [calendarSearch, setCalendarSearch] = useState(false);
  const [calendarSearchTime, setCalendarSearchTime] = useState(''); // 日历搜索的时间

  const [purchaseAnnouncement, setPurchaseAnnouncement] = useState({});

  const [tenderDateArr, setTenderDateArr] = useState<string[]>([]);

  // 获取征询意见列表
  useEffect(() => {
    // 之后要传到后台筛选数据
    getPurchaseAnnouncementList()
      .then((res) => {
        const data = res?.data;
        setPurchaseAnnouncement(data);

        // 筛选具有投标的日期
        const tenderDate = [];
        for (let item of data) {
          let date = moment(item?.startTime).format('YYYY-MM-DD');
          tenderDate.push(date);
        }
        setTenderDateArr(tenderDate);
      })
      .catch((err) => console.log(err));
  }, [calendarSearchTime]);

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.cardContent}>
          <div className={styles.firstLineBox}>
            <div className={styles.calendarWrapper}>
              <Row className={styles.title}>
                <Typography.Title className={styles.typographytitle} level={5}>
                  <CalendarOutlined style={{ margin: '0 10px' }} />
                  投标日历
                </Typography.Title>
              </Row>
              <Card className={styles.calendarCard}>
                <CalendarTender
                  setCalendarSearchTime={setCalendarSearchTime}
                  setCalendarSearch={setCalendarSearch}
                  tenderDateArr={tenderDateArr}
                />
              </Card>
            </div>
            {/* 不是通过日历搜索 */}
            {!calendarSearch && (
              <div className={styles.resourceWrapper}>
                <ResourceAnnounce onLoginCardVisiable={setLoginCardVisiable} />
              </div>
            )}
            {loginCardVisiable && !calendarSearch && (
              <div className={styles.loginWrapper}>
                <Row className={styles.title}>
                  <Typography.Title className={styles.typographytitle} level={5}>
                    <LoginOutlined style={{ margin: '0 10px' }} />
                    用户登录
                  </Typography.Title>
                </Row>
                <Card className={styles.loginCard}>
                  <FormNormalLogin />
                  <JumpSystemLine />
                </Card>
              </div>
            )}
            {/* 通过日历搜索 */}
            {calendarSearch && (
              <>
                <div className={styles.calendarSearchWrapper}>
                  <Card className={styles.calendarSearchTitle}>
                    <Row>
                      <p>
                        <ContainerOutlined style={{ fontSize: 22, marginRight: 10 }} />
                        {calendarSearchTime}投标项目
                      </p>
                      <p
                        className={styles.calendarSearchTitleText}
                        onClick={() => window.location.reload()}
                      >
                        {' '}
                        <DoubleLeftOutlined />
                        返回
                      </p>
                    </Row>
                    <Divider dashed />
                  </Card>
                  <Card className={styles.calendarSearchContent}>
                    <ResourceItemElemMore
                      data={purchaseAnnouncement}
                      calendarSearchTime={calendarSearchTime}
                    />
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WelcomeMain;
