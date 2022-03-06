import React from 'react';
import Footer from '../Footer'
import styles from './index.less';
import Header from '../Header'
import CalendarTender from '../CalendarTender'
import { Card, Carousel, Row, Typography } from 'antd';
import FormNormalLogin from '../FormNormalLogin';
import { CalendarOutlined, LoginOutlined } from '@ant-design/icons';


const Main: React.FC = () => {

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
                    <div style={{ width: '720px' }}>
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
                    </div>
                    <div className={styles.loginWrapper}>
                        <Row className={styles.title}>
                            <Typography.Title className={styles.typographytitle} level={5} ><LoginOutlined style={{ margin: '0 10px' }} />用户登录</Typography.Title>
                        </Row>

                        <Card className={styles.loginCard}>
                            <FormNormalLogin />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Frame: React.FC = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />

        </div>

    );
};

export default Frame;
