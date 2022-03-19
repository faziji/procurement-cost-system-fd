import React, { useState } from 'react';
import styles from './index.less';
import CalendarTender from '../CalendarTender'
import { Card, Col, message, Row, Typography } from 'antd';
import FormNormalLogin from '../FormNormalLogin';
import { CalendarOutlined, LoginOutlined, ToolOutlined } from '@ant-design/icons';
import ResourceAnnounce from './ResourceAnnounce'
import { getConsultationList } from '@/services/resource/api'
import { useRequest } from '@umijs/hooks';



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

    const [consultationList, setConsultationList] = useState({})

    // const getConsultationListMethod = async () => await getConsultationList().then(res => {
    //     if (res?.code === 0) {
    //         setConsultationList(res?.data)
    //     } else {
    //         console.log('consultationList获取失败');
    //     }
    // }
    // ).catch(error => message.error(error))

    // 获取征询意见列表
    // getConsultationListMethod()
    // const consultationList = getConsultationListMethod().
    // console.log('22222222222222222', consultationList);
    // 获取tab列表数据
    const { data: listData } = useRequest(() => {
        return getConsultationList();
    });
    console.log('22222222222222222', listData);


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
                        <ResourceAnnounce />
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
export default WelcomeMain;
