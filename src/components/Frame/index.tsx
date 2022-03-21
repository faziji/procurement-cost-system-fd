import Footer from "@/components/Frame/Footer"
import Header from "@/components/Frame/Header"
import { NavLink } from "umi";
import styles from './index.less';

import { DownOutlined, RightOutlined } from '@ant-design/icons'

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

    return (
        <>
            <Header />
            <div className={styles.mainWrapperNav}>
                <div className={styles.mainContent}>
                    <div className={styles.leftContent}>
                        <NavLink to={menu[0].route}>
                            <div className={styles.navTitle}>
                                <DownOutlined style={{ marginLeft: 30 }} />{menu[0].itemName}
                            </div>
                        </NavLink>
                        <hr />
                        {
                            menu.slice(1).map((item: any) => (
                                <>
                                    <NavLink className={styles.navItem} to={`${item.route}?current=${item.id}`} key={item.toString()} onClick={() => onCurrent(item.id)}>
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
                    <div className={styles.rightContent}>
                        {props.children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Frame