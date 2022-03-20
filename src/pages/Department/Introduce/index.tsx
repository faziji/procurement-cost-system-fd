import Footer from '@/components/Frame/Footer';
import Header from '@/components/Frame/Header';
import React, { useState } from 'react';
import styles from './index.less';
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { NavLink } from 'umi';


const Introduce: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.mainWrapper}>
                <div className={styles.mainContent}>

                    <div className={styles.leftContent}>
                        <NavLink to="/department">
                            <div className={styles.navTitle}>
                                <DownOutlined style={{ marginLeft: 30 }} />部门概况
                            </div>
                        </NavLink>
                        <hr />
                        <NavLink className={styles.navItem} to="/department/introduce">

                            <p>
                                <RightOutlined style={{ fontSize: '16px', margin: '0 5px' }} />部门简介
                            </p>
                        </NavLink>

                        <hr />
                        <NavLink className={styles.navItem} to="/department/organization">
                            组织架构
                        </NavLink>

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

export default Introduce