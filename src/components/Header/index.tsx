
import styles from './index.less';

const Header: React.FC = () => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.title} style={{ height: "110px", backgroundColor: 'pink' }}><h1>采购招标中心</h1></div>
            <div className={styles.headerNav} style={{ height: "40px", backgroundColor: "blue", opacity: 0.5 }}>导航栏</div>
            <div className={styles.banner}><img src="http://ztbzx.cqu.edu.cn/sfw_cms/res/cms/images/banner.jpg" alt='banner' /></div>
        </div>
    )
}

export default Header
