import Footer from '@/components/Frame/Footer';
import Header from '@/components/Frame/Header';
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
                            <DownOutlined style={{ marginLeft: 40 }} />部门概况
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