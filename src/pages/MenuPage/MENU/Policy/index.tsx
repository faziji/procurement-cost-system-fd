import React, { useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { policyMenu } from '@/resources/index'
import styles from './index.less';
import { getPolicyList } from '@/services/guide/api';
import { Col, Divider, Empty, Pagination, Row } from 'antd';
import moment from 'moment';


const Policy: React.FC = (props: any) => {

    const [current, setCurrent] = useState(props.location.query?.current || 1)
    const [policy, setPolicy] = useState([])

    // 获取征询意见列表
    useEffect(() => {
        // 之后要传到后台筛选数据
        getPolicyList({ current: current }).then(res => {
            setPolicy(res?.data)
        }).catch(err => console.log(err))
    }, [current]);

    return (
        <>
            <FrameNav menu={policyMenu} current={current} onCurrent={setCurrent} {...props} >
                {/* 留空添加额外的组件 */}
                <div className={styles.itemWrapper}>
                    <div style={{ width: 1000 }}>
                        {
                            policy?.length ? policy.map((item: any, index: any) => {
                                return (
                                    <div key={item.id} className={styles.itemMore}>
                                        <Row>
                                            <Col span={1}>
                                                [{index + 1}]
                                            </Col>
                                            <Col span={19} className={styles.itemHoverMore}>
                                                <a className={styles.itemHoverMore} href={`/guideDetail?key=${item.key}&name=${item.name}&createdAt=${moment(item.createdAt).format('YYYY-MM-DD')}`}> {item.name}</a>
                                            </Col>
                                            <Col span={4} style={{ fontSize: 14 }}>
                                                {moment(item.createdAt).format('YYYY-MM-DD')}
                                            </Col>
                                        </Row>
                                        <Divider dashed />
                                    </div>
                                )
                            })
                                :
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }
                        <Row>
                            <Pagination
                                total={policy?.length || 0}
                                showSizeChanger
                                showQuickJumper
                                showTotal={total => `共有 ${total} 条`}
                            />
                        </Row>
                    </div>
                </div>
            </FrameNav>
        </>
    )
}

export default Policy