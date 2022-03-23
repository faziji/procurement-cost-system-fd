import { Card, Col, Divider, Empty, Row, Typography } from "antd"
import { memo, useEffect, useState } from "react"
import { ToolOutlined, DoubleRightOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getConsultationList, getPurchaseAnnouncementList, getResultAnnouncementList, getCorrectAnnouncementList } from '@/services/resource/api'
import { useRequest } from '@umijs/hooks';
import classnames from 'classnames'
import { Link } from "umi";
import { history } from "umi";

const ResourceAnnounce: any = (props: any) => {
    let { onLoginCardVisiable } = props
    /**
     * 渲染具体内容
     */
    const ResourceItemElem = ({ data, state }: any) => {

        let handleData = data?.slice(0, 8) // 取前8个
        return (
            <Card style={{ width: 710, height: 359 }}>
                {
                    handleData?.length ? handleData.map((item: any, index: any) => {
                        return (
                            <div key={item.id} className={styles.resourceItem}>
                                <Row>
                                    <Col span={1}>
                                        [{index + 1}]
                                    </Col>
                                    <Col span={15} className={styles.itemHover}>
                                        <Link to={`/resourceDetail?current=${state}&id=${item.id}`}>
                                            {item?.name?.length <= 23 ? item.name : item.name?.slice(0, 23) + '...'}
                                        </Link>
                                    </Col>
                                    <Col span={4} style={{ color: '#ff4d4f', fontSize: 12 }}>
                                        活动已结束
                                    </Col>
                                    <Col span={4} style={{ fontSize: 12 }}>
                                        {item.publishTime}
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                        :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }

                <Row>
                    <Col span={10}></Col>
                    {
                        data?.length > 8 && <Col style={{ marginTop: 15 }} className={styles.itemHover}>
                            <Link to={`/resources?current=${state}`}>查看更多<DoubleRightOutlined /></Link>
                        </Col>
                    }
                </Row>
            </Card>)
    }

    /**
     * 加载更多
     */
    const ResourceItemElemMore = ({ data, state }: any) => {

        let handleData = data // 取前8个
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

    /**
     * 获取公告资源数据
     */
    // 获取征询意见列表
    const consultationListRes = useRequest(() => {
        return getConsultationList();
    });
    const consultationList = consultationListRes?.data?.data
    // 获取征询意见列表
    const purchaseAnnouncementRes = useRequest(() => {
        return getPurchaseAnnouncementList();
    });
    const purchaseAnnouncement = purchaseAnnouncementRes?.data?.data
    // 获取结果公告
    const resultAnnouncementRes = useRequest(() => {
        return getResultAnnouncementList();
    });
    const resultAnnouncement = resultAnnouncementRes?.data?.data
    // 获取结果公告
    const correctAnnouncementRes = useRequest(() => {
        return getCorrectAnnouncementList();
    });
    const correctAnnouncement = correctAnnouncementRes?.data?.data

    // 判断是第几个tab
    const [state, setState] = useState(1)
    // 更多页面的组件
    const [moreList, setMoreList] = useState(false)

    const ResourceContent = () => {
        let content = <ResourceItemElem data={consultationList} state={state} />

        if (state === 1) {
            content = <ResourceItemElem data={consultationList} state={state} />
        }
        else if (state === 2) {
            content = <ResourceItemElem data={purchaseAnnouncement} state={state} />
        }
        else if (state === 3) {
            content = <ResourceItemElem data={resultAnnouncement} state={state} />
        }
        else if (state === 4) {
            content = <ResourceItemElem data={correctAnnouncement} state={state} />
        }
        return content
    }

    const ResourceContentMore = () => {
        let content = <ResourceItemElemMore data={consultationList} state={state} />
        if (state === 1) {
            content = <ResourceItemElemMore data={consultationList} state={state} />
        }
        else if (state === 2) {
            content = <ResourceItemElemMore data={purchaseAnnouncement} state={state} />
        }
        else if (state === 3) {
            content = <ResourceItemElemMore data={resultAnnouncement} state={state} />
        }
        else if (state === 4) {
            content = <ResourceItemElemMore data={correctAnnouncement} state={state} />
        }
        return content
    }

    // 替换更多的列组件以及隐藏登录面板
    const handleMoreList = () => {
        setMoreList(true)
        onLoginCardVisiable(false)
    }

    return (
        <>
            {!moreList ? <><Row className={styles.title}>
                <Col span={5}>
                    <Typography.Title className={styles.typographytitle} level={5} ><ToolOutlined style={{ margin: '0 10px' }} />货物与服务</Typography.Title>
                </Col>
                <Col>
                    <Link to='/welcome' className={styles.titleNav} onClick={handleMoreList}>
                        <div className={classnames(styles.navItem, state === 1 ? styles.navItemHover : '')} onMouseEnter={() => setState(1)}>
                            <div className={styles.navItemText}>
                                征询意见
                            </div>
                        </div>
                        <div className={classnames(styles.navItem, state === 2 ? styles.navItemHover : '')} onMouseEnter={() => setState(2)}>
                            <div className={styles.navItemText}>
                                采购公告
                            </div>
                        </div>
                        <div className={classnames(styles.navItem, state === 3 ? styles.navItemHover : '')} onMouseEnter={() => setState(3)}>
                            <div className={styles.navItemText}>
                                结果公告
                            </div>
                        </div>
                        <div className={classnames(styles.navItem, state === 4 ? styles.navItemHover : '')} onMouseEnter={() => setState(4)}>
                            <div className={styles.navItemText}>
                                更正意见
                            </div>
                        </div>
                        <div className={styles.navItemText}>
                            {/* 查询<HeaderSearch options={[]} /> */}
                            {/* 查询 */}
                        </div>
                    </Link>
                </Col>
            </Row>
                <Row>
                    <ResourceContent />
                </Row></> :
                <div className={styles.moreListWrapper}>
                    <Card className={styles.moreListNav}>
                        <Row>
                            <div>
                                采购方式：
                            </div>
                            <div className={classnames(styles.moreListNavTitle, state == 0 ? styles.navItemSelected : '')} onClick={() => setState(0)}>
                                全部
                            </div>
                            <div className={classnames(styles.moreListNavTitle, state == 1 ? styles.navItemSelected : '')} onClick={() => setState(1)}>
                                征询意见
                            </div>
                            <div className={classnames(styles.moreListNavTitle, state == 2 ? styles.navItemSelected : '')} onClick={() => setState(2)}>
                                采购公告
                            </div>
                            <div className={classnames(styles.moreListNavTitle, state == 3 ? styles.navItemSelected : '')} onClick={() => setState(3)}>
                                结果公告
                            </div>
                            <div className={classnames(styles.moreListNavTitle, state == 4 ? styles.navItemSelected : '')} onClick={() => setState(4)}>
                                更正公告
                            </div>
                        </Row>
                        <Divider dashed />

                    </Card>
                    <Card className={styles.moreListContent}>
                        {/* {JSON.stringify(consultationList)} */}
                        <ResourceContentMore />
                    </Card >
                    {/* <div >

                    </div> */}
                </div>

            }
        </>
    )

}

export default ResourceAnnounce