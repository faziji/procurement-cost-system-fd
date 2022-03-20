import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useState } from 'react';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons'


const Department: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.mainWrapper}>
                <div className={styles.mainContent}>

                    <div className={styles.leftContent}>
                        <div className={styles.navTitle}>
                            <DownOutlined style={{ margin: "0 5px" }} />部门概况
                        </div>
                        <hr />
                        <div className={styles.navItem}>
                            部门简介
                        </div>
                        <hr />
                        <div className={styles.navItem}>
                            组织架构
                        </div>
                        <hr />
                        <div className={styles.navItem}>
                            岗位职责
                        </div>
                        <hr />

                        <img style={{ width: 200 }} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/list.jpg" alt="图片" />
                    </div>

                </div>
            </div>

            <Footer />

        </>

    )
}

export default Department