import Footer from "@/components/Frame/Footer"
import Header from "@/components/Frame/Header"
import { Link, NavLink } from "umi";
import styles from './index.less';

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { qiNiuUrl } from '../../../config/qiniuyun'


import { DownOutlined, HomeOutlined, RightOutlined } from '@ant-design/icons'
import { Breadcrumb, Col, Divider, Row } from "antd";
import { memo } from "react";

/**
 * 内容不带左侧导航栏
 */
const Frame: React.FC = (props: any) => {
    return (
        <>
            <Header />
            <div className={styles.mainWrapper}>
                <div className={styles.contentWrapper}>
                    {props.children}
                </div>
            </div>
            <Footer />
        </>
    )

}

export const FrameNav: any = (props: any) => {
    const { menu, current, onCurrent } = props

    // 当路由变化参数时更新组件状态
    if (current !== props.location.query?.current) {
        onCurrent(props.location.query?.current)
    }

    const onError = (e: any) => {
        console.log('显示错误');
    }

    const FileViewerEle = memo((props: any) => {
        return (
            <div className={styles.fileViewerWrapper}>
                <FileViewer
                    fileType="docx"
                    filePath={qiNiuUrl + menu[current || 1].itemName + '.docx'}
                    errorComponent={CustomErrorComponent}
                    onError={onError} />
            </div>
        )
    }, current)

    return (
        <>
            <Header />
            <div className={styles.mainWrapperNav}>
                <div className={styles.mainContent}>
                    <div className={styles.leftContent}>
                        <NavLink to={menu[1].route}>
                            <div className={styles.navTitle}>
                                <DownOutlined style={{ marginLeft: 30 }} />{menu[0].itemName}
                            </div>
                        </NavLink>
                        <hr />
                        {
                            menu.slice(1).map((item: any) => (
                                <>
                                    <NavLink className={styles.navItem} to={item.route} key={item.toString()} onClick={() => onCurrent(item.id)}>
                                        <p>
                                            {current == item.id && <RightOutlined style={{ fontSize: '16px', margin: '0 5px' }} />} {item.itemName}
                                        </p>
                                    </NavLink>
                                    <hr />
                                </>
                            ))
                        }
                        <img style={{ width: 200 }} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/list.jpg" alt="图片" />
                    </div>
                    <div className={styles.rightContent} >
                        <Row >
                            <Col className={styles.rightContentCol}>
                                {menu[current || 1].itemName}
                            </Col>
                            <Col className={styles.rightContentColBreadcrumb}>
                                当前位置：
                            </Col>
                            <Col className={styles.rightContentColBreadcrumb}>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to={'/welcome'}><HomeOutlined />首页</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to={menu[0].route}>{menu[0]?.itemName}</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {menu[current || 1].itemName}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Divider />
                        {/* <Row>
                            <FileViewer
                                style={{ backgroundColor: "red" }}
                                fileType="docx"
                                filePath={qiNiuUrl + menu[current || 1].itemName + '.docx'}
                                errorComponent={CustomErrorComponent}
                                onError={onError} />
                        </Row> */}
                        <Row>
                            <FileViewerEle />

                        </Row>
                        <Row>
                            {props.children}
                        </Row>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Frame