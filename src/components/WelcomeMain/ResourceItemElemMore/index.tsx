import { Col, Divider, Empty, Pagination, Row } from 'antd';
import moment from 'moment';
import { Link } from 'umi';
import Countdown from '../Countdown';
import styles from './index.less';

/**
 * 加载更多
 */
const ResourceItemElemMore: any = ({ data, calendarSearchTime, state = 2 }: any) => {
  let handleData: any = [];
  for (let item of data) {
    const startTime = moment(item.startTime).format('YYYY-MM-DD');
    if (startTime == calendarSearchTime) {
      handleData.push(item);
    }
  }
  return (
    <div style={{ width: 1000 }}>
      {handleData?.length ? (
        handleData.map((item: any, index: any) => {
          return (
            <div key={item.id} className={styles.resourceItemMore}>
              <Row>
                <Col span={1}>[{index + 1}]</Col>
                <Col span={13} className={styles.itemHoverMore}>
                  <Link to={`/resourceDetail?current=${state}&id=${item.id}`}>{item.name}</Link>
                </Col>
                <Col span={4} style={{ color: '#ff4d4f', fontSize: 12, paddingLeft: 25 }}>
                  {state == 2 && <Countdown endTime={item.endTime} startTime={item?.startTime} />}
                </Col>
                <Col span={4} style={{ fontSize: 12 }}>
                  <p title="公告发布时间">{item.publishTime}</p>
                </Col>
              </Row>
              <Divider dashed />
            </div>
          );
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Row>
        <Pagination
          total={handleData?.length || 0}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共有 ${total} 条`}
        />
      </Row>
    </div>
  );
};

export default ResourceItemElemMore;
