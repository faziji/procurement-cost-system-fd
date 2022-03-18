import React from 'react';
import styles from './index.less';
import CalendarTender from '../CalendarTender'
import { Avatar, Card, Carousel, Row, Typography } from 'antd';
import FormNormalLogin from '../FormNormalLogin';
import { CalendarOutlined, LoginOutlined } from '@ant-design/icons';
import { getToken, getUerInfo } from '@/utils/index'

// import { CheckCard } from '@ant-design/pro-card';


const WelcomeMain: React.FC = () => {

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.cardContent}>
                <div className={styles.firstLineBox}>
                    <div className={styles.calendarWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><CalendarOutlined style={{ margin: '0 10px' }} />采购日历</Typography.Title>
                        </Row>

                        <Card className={styles.calendarCard}>
                            <CalendarTender />
                        </Card>
                    </div>
                    {/* <div style={{ width: '720px' }}>
                        <Carousel autoplay>
                            <div>
                                <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                    </div> */}
                    <div className={styles.loginWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><LoginOutlined style={{ margin: '0 10px' }} />用户登录</Typography.Title>
                        </Row>

                        <Card className={styles.loginCard}>
                            <FormNormalLogin />
                        </Card>

                        {/* {!getToken() ? <Card className={styles.loginCard}>
                            <FormNormalLogin />
                        </Card>
                            :
                            <Card className={styles.loginedCard}>
                                {getUerInfo()}
                                <CheckCard
                                    title="Spring Boot"
                                    avatar={
                                        <Avatar
                                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                                            size="large"
                                        />
                                    }
                                    description="通过业界流行的技术栈来快速构建 Java 后端应用"
                                    value="SpringBoot"
                                />
                            </Card>} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Main: React.FC = () => {

    return (
        <WelcomeMain />
    )
}
export default Main;
