import React, { useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { instructionMenu } from '@/resources/index'
import styles from './index.less';
import { getInstructionList } from '@/services/guide/api';
import { Col, Divider, Empty, Pagination, Row } from 'antd';
import moment from 'moment';


const Instruction: React.FC = (props: any) => {

    const [current, setCurrent] = useState(props.location.query?.current || 1)
    const [instruction, setInstruction] = useState([])

    // 获取征询意见列表
    useEffect(() => {
        // 之后要传到后台筛选数据
        getInstructionList({ current: current }).then(res => {
            setInstruction(res?.data)
        }).catch(err => console.log(err))
    }, [current]);

    return (
        <>
            <FrameNav menu={instructionMenu} current={current} onCurrent={setCurrent} {...props} >
                {/* 留空添加额外的组件 */}
                <div className={styles.itemWrapper}>
                    <div style={{ width: 1000 }}>
                        {
                            instruction?.length ? instruction.map((item: any, index: any) => {
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
                                total={instruction?.length || 0}
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

export default Instruction