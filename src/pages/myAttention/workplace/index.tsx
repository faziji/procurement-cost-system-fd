import { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Col,
  List,
  Skeleton,
  Row,
  Statistic,
  Tag,
  Empty,
  Button,
  message,
} from 'antd';

import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { history } from 'umi';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
// import type { ActivitiesType, CurrentUser } from './data.d';
import { getAttentionList, deleteAttention, createAttention } from './service';

import { getUserInfo } from '@/utils';
import { getCurrentUserInfo } from '@/services/user/api';

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
  // const { loading, data = [] } = useRequest();

  // 获取用户信息
  const currentUser = JSON.parse(getUserInfo() || '{}');
  const [attentions, setAttentions] = useState([]);

  // 是否取消关注
  const [cancelAttention, setCancelAttention] = useState(false);

  useEffect(() => {
    getCurrentUserInfo()
      .then((res: any) => {
        if (res?.data == 'noLoginUser' || !currentUser) {
          message.error('用户未登录，跳转登录...');
          history.push('/welcome');
          return;
        }
      })
      .catch((err: any) => {
        console.log('发生了错误', err);
      });

    // 获取关注列表
    getAttentionList({
      username: currentUser?.username,
    })
      .then((res) => {
        console.log('返回的值是', res);
        setAttentions(res?.data);
      })
      .catch((err) => {
        console.log('发生了错误');
      });
  }, []);

  /**
   * 取消关注
   * @param id 关注编号
   */
  const handleCancelAttention = async (data: any) => {
    const { id } = data;
    await deleteAttention({ id })
      .then((res) => {
        console.log('取消关注成功', res);
        setCancelAttention(true);
        message.success('取消关注成功');
      })
      .catch((err) => {
        console.log('deleteAttention error:', err);
        message.error('网络异常，请稍后重试！');
      });
  };
  /**
   * 重新关注
   */
  const handleAttention = async (data: any) => {
    const { username } = JSON.parse(getUserInfo() || '{}');
    const { announcementId, announcementName, announcementType, announcementDescription } = data;

    await createAttention({
      username,
      announcementId,
      announcementName,
      announcementType,
      announcementDescription,
    })
      .then((res) => {
        console.log('重新关注成功', res);
        setCancelAttention(false);
        message.success('重新关注成功！');
      })
      .catch((err) => {
        console.log('重新关注成功', err);
        message.error('网络异常，请稍后重试！');
      });
  };

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
              {/* {JSON.stringify(attentions)} */}
              {attentions?.length != 0 &&
                attentions.map((item: any) => (
                  <Card.Grid className={styles.projectGrid} key={item.id}>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <Card.Meta
                        title={
                          <div className={styles.cardTitle}>
                            {/* <Avatar size="small" src={item.logo} /> */}
                            <Link
                              to={`/resourceDetail?current=${
                                item.announcementType == 'consultation'
                                  ? 1
                                  : item.announcementType == 'purchaseannouncement'
                                  ? 2
                                  : item.announcementType == 'resultannouncement'
                                  ? 3
                                  : 4
                              }&id=${item.announcementId}`}
                            >
                              {item.announcementName}
                            </Link>
                          </div>
                        }
                        description={'描述：' + item.announcementDescription}
                      />
                      {/* 存在bug，取消按钮统一状态了 */}
                      {/* {cancelAttention ? <Button className={styles.attentionButton} type="primary" onClick={() => handleAttention(item)}>重新关注</Button> :
                        <Button className={styles.attentionButton} danger onClick={() => handleCancelAttention(item)}>取消关注</Button>
                      } */}

                      <div className={styles.projectItemContent}>
                        {item.announcementType == 'consultation' ? (
                          <Tag color="green" key={item?.announcementType}>
                            征询意见
                          </Tag>
                        ) : item.announcementType == 'purchaseannouncement' ? (
                          <Tag color="orange" key={item?.announcementType}>
                            采购公告
                          </Tag>
                        ) : item.announcementType == 'resultannouncement' ? (
                          <Tag color="blue" key={item?.announcementType}>
                            结果公告
                          </Tag>
                        ) : (
                          <Tag color="red" key={item?.announcementType}>
                            更正公告
                          </Tag>
                        )}
                        {/* <Link to={item.memberLink}>{item.announcementType || ''}</Link> */}
                        {item.updatedAt && (
                          <span className={styles.datetime} title={item.createdAt}>
                            {moment(item.createdAt).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))}
              {attentions?.length == 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无关注" />
              )}
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
