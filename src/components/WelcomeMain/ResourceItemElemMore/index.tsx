import { Col, Divider, Empty, Row } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

/**
 * 加载更多
 */
const ResourceItemElemMore: any = ({ data, state = 2 }: any) => {

    let handleData = data
    return (
        <div style={{ width: 1000 }}>
            {
                handleData?.length ? handleData.map((item: any, index: any) => {
                    return (
                        <div key={item.id} className={styles.resourceItemMore}>
                            <Row>
                                <Col span={1}>
                                    [{index + 1}]
                                </Col>
                                <Col span={13} className={styles.itemHoverMore}>
                                    <Link to={`/resourceDetail?current=${state}&id=${item.id}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col span={4} style={{ color: '#ff4d4f', fontSize: 12, paddingLeft: 25 }}>
                                    活动已结束
                                </Col>
                                <Col span={4} style={{ fontSize: 12 }}>
                                    {item.publishTime}
                                </Col>
                            </Row>
                            <Divider dashed />
                        </div>
                    )
                })
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>)
}

export default ResourceItemElemMore
