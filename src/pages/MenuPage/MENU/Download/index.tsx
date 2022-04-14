// import React, { useEffect, useState } from 'react';
// import { FrameNav } from '@/components/Frame';
// import { downloadMenu } from '@/resources/index'


// const Download: React.FC = (props: any) => {
//     const [current, setCurrent] = useState(props.location.query?.current || 1)
//     return (
//         <>
//             <FrameNav menu={downloadMenu} current={current} onCurrent={setCurrent} {...props} >
//                 {/* 留空添加额外的组件 */}
//             </FrameNav>
//         </>
//     )
// }

// export default Download


import React, { useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { downloadMenu } from '@/resources/index'
import styles from './index.less';
import { getDownloadList } from '@/services/guide/api';
import { Button, Col, Divider, Empty, Pagination, Row } from 'antd';
import moment from 'moment';
import { qiNiuUrl } from '../../../../../config/qiniuyun'
import { DownloadOutlined } from '@ant-design/icons';



const Download: React.FC = (props: any) => {

    const [current, setCurrent] = useState(props.location.query?.current || 1)
    const [download, setDownload] = useState([])

    // 获取征询意见列表
    useEffect(() => {
        // 之后要传到后台筛选数据
        getDownloadList({ current: current }).then((res: { data: React.SetStateAction<never[]>; }) => {
            setDownload(res?.data)
        }).catch((err: any) => console.log(err))
    }, [current]);

    return (
        <>
            <FrameNav menu={downloadMenu} current={current} onCurrent={setCurrent} {...props} >
                {/* 留空添加额外的组件 */}
                <div className={styles.itemWrapper}>
                    <div style={{ width: 1000 }}>
                        {
                            download?.length ? download.map((item: any, index: any) => {
                                return (
                                    <div key={item.id} className={styles.itemMore}>
                                        <Row>
                                            <Col span={1}>
                                                [{index + 1}]
                                            </Col>
                                            <Col span={18} className={styles.itemHoverMore}>
                                                <a className={styles.itemHoverMore} href={`/guideDetail?key=${item.key}&name=${item.name}&createdAt=${moment(item.createdAt).format('YYYY-MM-DD')}&type=download`}> {item.name}</a>
                                            </Col>
                                            <Col span={3} style={{ fontSize: 14 }}>
                                                {moment(item.createdAt).format('YYYY-MM-DD')}
                                            </Col>
                                            <Col span={2} className={styles.itemHoverMore}>
                                                <a className={styles.itemHoverMore} target="_blank" href={qiNiuUrl + "Resources/" + item.key}><Button type="dashed" shape="round" icon={<DownloadOutlined />} /></a>
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
                                total={download?.length || 0}
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

export default Download


