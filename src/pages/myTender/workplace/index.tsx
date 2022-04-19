import { FC, useEffect, useState } from 'react';
import { Avatar, Card, Col, List, Skeleton, Row, Statistic, message, Tag } from 'antd';

import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
// import type { ActivitiesType, CurrentUser } from './data.d';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import { history } from 'umi';
import { getUserInfo } from '@/utils';
import { getCurrentUserInfo } from '@/services/user/api';
import { getTenderList } from './service';

const links = [
  {
    title: '我的信息',
    href: '/my',
  },
  {
    title: '我的投标',
    href: '/myTender',
  },
  {
    title: '首页',
    href: '/welcome',
  },
  {
    title: '部门概况',
    href: '/department?current=1',
  },
  {
    title: '政策法规',
    href: '/policy?current=1',
  },
  {
    title: '下载中心',
    href: '/download?current=1',
  },
  {
    title: '党建工作',
    href: '/party?current=1',
  },
  {
    title: '联系我们',
    href: '/contact?current=1',
  },
];

const PageHeaderContent: FC<any> = ({ currentUser }) => {
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          您好，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.username} | {currentUser.companyName}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: FC<Record<string, any>> = (tenderData: any) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="总投标数" value={tenderData?.tenderData?.length || '-'} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="投标排名" value={5} suffix="/ 13" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="访问投标公告" value={6} />
    </div>
  </div>
);

const Workplace: FC = () => {
  // const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  // const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  // const { data } = useRequest(fakeChartData);

  const currentUser = JSON.parse(getUserInfo() || '{}');
  const [tenderData, setTenderData] = useState([]);

  useEffect(() => {
    // 未登录，跳转首页
    getCurrentUserInfo()
      .then((res: any) => {
        if (res?.data == 'noLoginUser' || !res?.data) {
          message.error('用户未登录，跳转登录...');
          history.push('/welcome');
          return;
        } else {
        }
      })
      .catch((err) => {
        console.log('发生了错误', err);
      });

    // 获取投标列表
    getTenderList({
      supplierUsername: currentUser?.username,
    })
      .then((res) => {
        console.log('返回的值是', res);
        setTenderData(res?.data);
      })
      .catch((err) => {
        console.log('发生了错误');
      });
  }, []);

  // 获取用户信息

  return (
    <Card>
      <PageContainer
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent tenderData={tenderData} />}
      >
        {/* {JSON.stringify(tenderData)} */}
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="我的已投标"
              bordered={false}
              extra={<Link to="/">全部投标</Link>}
              // loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {tenderData.map((item: any) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          {/* <Avatar size="small" src={item.logo} /> */}
                          <Link to={`/resourceDetail?current=2&id=${item?.announcementId}`}>
                            {item.announcementName}
                          </Link>
                        </div>
                      }
                      description={'描述：' + item.announcementDescription}
                    />
                    <div className={styles.projectItemContent}>
                      <Tag color="green" key={item?.id}>
                        投标报价：{item.amount}元
                      </Tag>
                      {item.createdAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          投标时间：{moment(item.createdAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </Card>
  );
};

export default Workplace;
