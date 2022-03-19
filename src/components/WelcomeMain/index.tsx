import React, { useState } from 'react';
import styles from './index.less';
import CalendarTender from '../CalendarTender'
import { Avatar, Card, Carousel, Col, List, message, Row, Typography } from 'antd';
import FormNormalLogin from '../FormNormalLogin';
import { CalendarOutlined, LoginOutlined, ToolOutlined } from '@ant-design/icons';



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


    const [state, setState] = useState(0)

    const ResourceContent = () => {
        let constent = <></>
        if (state === 1) {
            constent = <>征询意见</>
        }
        else if (state === 2) {
            constent = <>采购公告</>
        }
        else if (state === 3) {
            constent = <>结果公告</>
        }
        else if (state === 4) {
            constent = <>更正公告</>
        }
        return constent
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.cardContent}>

                <div className={styles.firstLineBox}>
                    <div className={styles.calendarWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><CalendarOutlined style={{ margin: '0 10px' }} />投标日历</Typography.Title>
                        </Row>
                        <Card className={styles.calendarCard}>
                            <CalendarTender />
                        </Card>
                    </div>


                    <div className={styles.resourceWrapper}>
                        <Row className={styles.title}>
                            <Col span={5}>
                                <Typography.Title className={styles.typographytitle} level={5} ><ToolOutlined style={{ margin: '0 10px' }} />货物与服务</Typography.Title>
                            </Col>
                            <Col>
                                <div className={styles.titleNav}>
                                    <div className={styles.navItem} onMouseEnter={() => setState(1)}>
                                        <div className={styles.navItemText}>
                                            征询意见
                                        </div>
                                    </div>
                                    <div className={styles.navItem} onMouseEnter={() => setState(2)}>
                                        <div className={styles.navItemText}>
                                            采购公告
                                        </div>
                                    </div>
                                    <div className={styles.navItem} onMouseEnter={() => setState(3)}>
                                        <div className={styles.navItemText}>
                                            结果公告
                                        </div>
                                    </div>
                                    <div className={styles.navItem} onMouseEnter={() => setState(4)}>
                                        <div className={styles.navItemText}>
                                            更正意见
                                        </div>
                                    </div>


                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <ResourceContent />
                        </Row>

                    </div>



                    <div className={styles.loginWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><LoginOutlined style={{ margin: '0 10px' }} />用户登录</Typography.Title>
                        </Row>
                        <Card className={styles.loginCard}>
                            <FormNormalLogin />
                            <JumpSystemLine />
                        </Card>

                    </div>
                </div>

            </div>
        </div>
    )
}

// const Main: React.FC = () => {

//     return (
//         <WelcomeMain />
//     )
// }
export default WelcomeMain;
