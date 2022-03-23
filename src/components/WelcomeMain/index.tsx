import React, { useState } from 'react';
import styles from './index.less';
import CalendarTender from '../CalendarTender'
import { Card, Col, Divider, message, Row, Typography } from 'antd';
import FormNormalLogin from '../FormNormalLogin';
import { CalendarOutlined, ContainerOutlined, LoginOutlined, MergeCellsOutlined, ToolOutlined } from '@ant-design/icons';
import ResourceAnnounce from './ResourceAnnounce'


const JumpSystemLine = () => {
    return (
        <Row>
            <Col span={8}>
                <div className={styles.loginFormEntry1} >
                    <div className={styles.entryWrapper}>
                        <img className={styles.imagePic} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png" alt="" />
                        <p>供应商入口</p>
                    </div>
                </div>
            </Col>
            <Col span={8}>
                <div className={styles.loginFormEntry2} >
                    <div className={styles.entryWrapper}>
                        <img className={styles.imagePic} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png" alt="" />
                        <p>管理后台</p>
                    </div>
                </div>
            </Col>
            <Col span={8}>
                <div className={styles.loginFormEntry3} >
                    <div className={styles.entryWrapper}>
                        <img className={styles.imagePic} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png" alt="" />
                        <p>管理后台</p>
                    </div>
                </div>
            </Col>

        </Row>
    )
}

const WelcomeMain: React.FC = () => {

    // 是否展示login
    const [loginCardVisiable, setLoginCardVisiable] = useState(true)
    // 是否是日历点击搜索跳转的内容
    const [calendarSearch, setCalendarSearch] = useState(false)
    const [calendarSearchTime, setCalendarSearchTime] = useState('') // 日历搜索的时间


    return (
        <div className={styles.mainWrapper}>
            <div className={styles.cardContent}>

                <div className={styles.firstLineBox}>
                    <div className={styles.calendarWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><CalendarOutlined style={{ margin: '0 10px' }} />投标日历</Typography.Title>
                        </Row>
                        <Card className={styles.calendarCard}>
                            <CalendarTender setCalendarSearchTime={setCalendarSearchTime} setCalendarSearch={setCalendarSearch} />
                        </Card>
                    </div>

                    {/* 不是通过日历搜索 */}
                    {!calendarSearch && <div className={styles.resourceWrapper}>
                        <ResourceAnnounce onLoginCardVisiable={setLoginCardVisiable} />
                    </div>}
                    {loginCardVisiable && !calendarSearch && <div className={styles.loginWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><LoginOutlined style={{ margin: '0 10px' }} />用户登录</Typography.Title>
                        </Row>
                        <Card className={styles.loginCard}>
                            <FormNormalLogin />
                            <JumpSystemLine />
                        </Card>
                    </div>}
                    {/* 通过日历搜索 */}
                    {calendarSearch && <>
                        <div className={styles.calendarSearchWrapper}>
                            <Card className={styles.calendarSearchTitle}>

                                <p><ContainerOutlined style={{ fontSize: 22, marginRight: 10 }} />{calendarSearchTime}投标项目</p>
                                <Divider dashed />
                            </Card>
                        </div>
                    </>}
                </div>

            </div>
        </div>
    )
}
export default WelcomeMain;
