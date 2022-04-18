import type { FC } from 'react';
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';

import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
// import type { ActivitiesType, CurrentUser } from './data.d';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import { getUserInfo } from '@/utils';

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
  // const loading = currentUser && Object.keys(currentUser).length;
  // if (!loading) {
  //   return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  // }
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

const ExtraContent: FC<Record<string, any>> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="关注公告数" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="活跃度排名" value={5} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="访问公告数" value={102} />
    </div>
  </div>
);

const Workplace: FC = () => {
  // const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  // const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  // const { data } = useRequest(fakeChartData);

  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  // 获取用户信息
  const currentUser = JSON.parse(getUserInfo() || '{}');

  return (
    <Card>
      <PageContainer
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        {/* {getUserInfo()} */}
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="我关注的公告"
              bordered={false}
              extra={<Link to="/">全部公告</Link>}
              // loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {/* {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card bodyStyle={{ padding: 0 }} bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar size="small" src={item.logo} />
                        <Link to={item.href}>{item.title}</Link>
                      </div>
                    }
                    description={item.description}
                  />
                  <div className={styles.projectItemContent}>
                    <Link to={item.memberLink}>{item.member || ''}</Link>
                    {item.updatedAt && (
                      <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.updatedAt).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))} */}
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
