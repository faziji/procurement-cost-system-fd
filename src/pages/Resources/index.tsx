import React, { memo, useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { resourceMenu } from '@/resources/index';
import { Link, useRequest } from 'umi';
import {
  getConsultationList,
  getCorrectAnnouncementList,
  getPurchaseAnnouncementList,
  getResultAnnouncementList,
} from '@/services/resource/api';
import { Card, Col, Empty, Row } from 'antd';
import styles from './index.less';
import { DoubleRightOutlined } from '@ant-design/icons';

/**
 * 渲染具体内容
 */
const ResourceItemElem = ({ data, state }: any) => {
  let handleData = data;
  return (
    <Card style={{ width: 710, height: 359 }}>
      {handleData?.length ? (
        handleData.map((item: any, index: any) => {
          return (
            <div key={item.id} className={styles.resourceItem}>
              <Row>
                <Col span={1}>[{index + 1}]</Col>
                <Col span={15} className={styles.itemHover}>
                  {item?.name?.length <= 23 ? item.name : item.name?.slice(0, 23) + '...'}
                </Col>
                <Col span={4} style={{ color: '#ff4d4f', fontSize: 12 }}>
                  {state == 2 && '活动已结束'}
                </Col>
                <Col span={4} style={{ fontSize: 12 }}>
                  {item.publishTime}
                </Col>
              </Row>
            </div>
          );
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Card>
  );
};

const Resources: React.FC = (props: any) => {
  const [current, setCurrent] = useState(props.location.query?.current || 1);

  /**
   * 获取公告资源数据
   */
  // 获取征询意见列表
  const consultationListRes = useRequest(() => {
    return getConsultationList();
  });
  const consultationList = consultationListRes?.data;
  // 获取征询意见列表
  const purchaseAnnouncementRes = useRequest(() => {
    return getPurchaseAnnouncementList();
  });
  const purchaseAnnouncement = purchaseAnnouncementRes?.data;
  // 获取结果公告
  const resultAnnouncementRes = useRequest(() => {
    return getResultAnnouncementList();
  });
  const resultAnnouncement = resultAnnouncementRes?.data;
  // 获取结果公告
  const correctAnnouncementRes = useRequest(() => {
    return getCorrectAnnouncementList();
  });
  const correctAnnouncement = correctAnnouncementRes?.data;

  const ResourceContent = memo((props: any) => {
    let constent = <ResourceItemElem data={consultationList} state={current} />;

    if (current === 1) {
      constent = <ResourceItemElem data={consultationList} state={current} />;
    } else if (current === 2) {
      constent = <ResourceItemElem data={purchaseAnnouncement} state={current} />;
    } else if (current === 3) {
      constent = <ResourceItemElem data={resultAnnouncement} state={current} />;
    } else if (current === 4) {
      constent = <ResourceItemElem data={correctAnnouncement} state={current} />;
    }
    return constent;
  }, current);

  return (
    <>
      <FrameNav menu={resourceMenu} current={current} onCurrent={setCurrent} {...props}>
        {/* 留空添加额外的组件 */}
        <ResourceContent />
        {current}
      </FrameNav>
    </>
  );
};

export default Resources;
