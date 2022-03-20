import Footer from "@/components/Footer"
import Header from "@/components/Header"
import styles from './index.less';


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

export default Frame