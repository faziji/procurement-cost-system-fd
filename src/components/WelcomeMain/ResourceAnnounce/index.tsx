import { Col, Row, Typography } from "antd"
import { useState } from "react"
import { ToolOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getConsultationList } from '@/services/resource/api'
import { useRequest } from '@umijs/hooks';


const ResourceAnnounce: React.FC = () => {


    /**
     * 获取consultationList
     */
    const { data } = useRequest(() => {
        return getConsultationList();
    });
    const consultationList = data?.data


    const [state, setState] = useState(0)

    const ResourceContent = () => {
        let constent = <>
            {JSON.stringify(consultationList)}
            征询意见
        </>


        if (state === 1) {
            constent = <>
                {JSON.stringify(consultationList)}
                征询意见
            </>
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
        <>
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
        </>
    )

}

export default ResourceAnnounce