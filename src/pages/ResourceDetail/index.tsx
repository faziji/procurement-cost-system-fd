import Frame from "@/components/Frame";
import { detailConsultation, detailPurchaseAnnouncement, detailResultAnnouncement, detailCorrectAnnouncement } from "@/services/resource/api";
import { EyeOutlined } from "@ant-design/icons";
import { useRequest } from "umi";
import styles from './index.less'

const ResourceDetail: React.FC = (props: any) => {
    const { current, id } = props.location?.query

    let data: any = {}

    if (current == 1) {
        const consultationListRes = useRequest(() => {
            return detailConsultation({ id });
        });
        data = consultationListRes?.data
    } else if (current == 2) {
        const detailPurchaseAnnouncementRes = useRequest(() => {
            return detailPurchaseAnnouncement({ id });
        });
        data = detailPurchaseAnnouncementRes?.data
    } else if (current == 3) {
        const detailResultAnnouncementRes = useRequest(() => {
            return detailResultAnnouncement({ id });
        });
        data = detailResultAnnouncementRes?.data
    } else if (current == 4) {
        const detailCorrectAnnouncementRes = useRequest(() => {
            return detailCorrectAnnouncement({ id });
        });
        data = detailCorrectAnnouncementRes?.data
    } else {
        data = { name: "网络异常" }
    }

    return (
        <>
            <Frame>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentTitle}>
                        <div className={styles.contentTitleText}>
                            {data?.name}
                        </div>
                        <div className={styles.contentTitleDesc}>
                            发布时间：{data?.publishTime} <p>| <EyeOutlined /></p>
                            浏览次数：{data?.viewTime}
                        </div>
                    </div>
                    {current}---------{id}----{JSON.stringify(data)}
                </div>
            </Frame>
        </>
    )
}


export default ResourceDetail;
