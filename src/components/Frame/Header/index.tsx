
import { Button, Dropdown, Menu } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Header: React.FC = () => {

    const menu = (
        <Menu>
            <Menu.Item key="1" className={styles.menuItem}>
                <Link to="/department?current=1">
                    部门简介
                </Link>
            </Menu.Item>
            <Menu.Item key="2" className={styles.menuItem}>
                <Link to="/department?current=2">
                    组织架构
                </Link>
            </Menu.Item>
            <Menu.Item key="3" className={styles.menuItem}>
                <Link to="/department?current=3">
                    岗位职责
                </Link>
            </Menu.Item>
        </Menu>
    );


    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerTitle}>
                <div className={styles.headerContent}>
                    <Link to="/welcome">
                        <h1 className={styles.headerContentText}>企业招标采购中心</h1>
                    </Link>
                </div>
            </div>
            <div className={styles.headerNav}>

                <div className={styles.headerNavContent}>
                    <NavLink className={styles.navItem} to="/welcome">
                        首页
                    </NavLink>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            部门概况
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            政策法规
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            办事指南
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            下载中心
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            党建工作
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            联系我们
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <NavLink className={styles.navItem} to='/department'>
                            管理后台
                        </NavLink>
                    </Dropdown>
                </div>
            </div>
            {/* <div className={styles.banner}><img src="http://ztbzx.cqu.edu.cn/sfw_cms/res/cms/images/banner.jpg" alt='banner' /></div> */}
        </div>
    )
}

export default Header
