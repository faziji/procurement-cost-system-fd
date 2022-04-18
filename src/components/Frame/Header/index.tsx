import { Dropdown, Menu } from 'antd';
import { NavLink } from 'umi';
import styles from './index.less';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  departmentMenu,
  policyMenu,
  contactMenu,
  instructionMenu,
  downloadMenu,
  partyMenu,
} from '@/resources';

const Header: React.FC = () => {
  const departmentMenuItem = (
    <Menu>
      {departmentMenu.slice(1).map((item) => (
        <Menu.Item key={item.id} className={styles.menuItem}>
          <Link to={item.route}>{item.itemName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const policyMenuItem = (
    <Menu>
      {policyMenu.slice(1).map((item) => (
        <Menu.Item key={item.id} className={styles.menuItem}>
          <Link to={item.route}>{item.itemName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // 办事指南
  const instructionMenuItem = (
    <Menu>
      {instructionMenu.slice(1).map((item) => (
        <Menu.Item key={item.id} className={styles.menuItem}>
          <Link to={item.route}>{item.itemName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // 下载中心
  const downloadMenuItem = (
    <Menu>
      {downloadMenu.slice(1).map((item) => (
        <Menu.Item key={item.id} className={styles.menuItem}>
          <Link to={item.route}>{item.itemName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // 党建工作
  const partyMenuItem = (
    <Menu>
      {partyMenu.slice(1).map((item) => (
        <Menu.Item key={item.id} className={styles.menuItem}>
          <Link to={item.route}>{item.itemName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // 联系我们
  const contactMenuItem = (
    <Menu>
      {contactMenu.slice(1).map((item) => (
        <Menu.Item key={item.id} className={styles.menuItem}>
          <Link to={item.route}>{item.itemName}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerTitle}>
        <div className={styles.headerContent}>
          <Link to="/welcome">
            <h1 className={styles.headerContentText}>
              <img
                src="https://hyweb-test.oss-cn-shenzhen.aliyuncs.com/extension/pic/e577f6f7/ad4665a847_1597888775639.png"
                style={{ opacity: 0.9 }}
              />
              企业招标采购中心
            </h1>
          </Link>
        </div>
      </div>
      <div className={styles.headerNav}>
        <div className={styles.headerNavContent}>
          <NavLink className={styles.navItem} to="/welcome">
            首页
          </NavLink>
          <Dropdown overlay={departmentMenuItem} placement="bottomCenter">
            <NavLink className={styles.navItem} to={departmentMenu[1].route}>
              部门概况
            </NavLink>
          </Dropdown>
          <Dropdown overlay={policyMenuItem} placement="bottomCenter">
            <NavLink className={styles.navItem} to={policyMenu[1].route}>
              政策法规
            </NavLink>
          </Dropdown>
          <Dropdown overlay={instructionMenuItem} placement="bottomCenter">
            <NavLink className={styles.navItem} to={instructionMenu[1].route}>
              办事指南
            </NavLink>
          </Dropdown>
          <Dropdown overlay={downloadMenuItem} placement="bottomCenter">
            <NavLink className={styles.navItem} to={downloadMenu[1].route}>
              下载中心
            </NavLink>
          </Dropdown>
          <Dropdown overlay={partyMenuItem} placement="bottomCenter">
            <NavLink className={styles.navItem} to={partyMenu[1].route}>
              党建工作
            </NavLink>
          </Dropdown>
          <Dropdown overlay={contactMenuItem} placement="bottomCenter">
            <NavLink className={styles.navItem} to={contactMenu[1].route}>
              联系我们
            </NavLink>
          </Dropdown>
          <NavLink className={styles.navItem} to="/welcome">
            管理后台
          </NavLink>
        </div>
      </div>
      {/* <div className={styles.banner}><img src="http://ztbzx.cqu.edu.cn/sfw_cms/res/cms/images/banner.jpg" alt='banner' /></div> */}
    </div>
  );
};

export default Header;
