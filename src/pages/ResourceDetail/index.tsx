import Frame from "@/components/Frame";
import { detailConsultation, detailPurchaseAnnouncement, detailResultAnnouncement, detailCorrectAnnouncement } from "@/services/resource/api";
import { useEffect } from "react";
import { useRequest } from "umi";

const ResourceDetail: React.FC = (props: any) => {
    const { current, id } = props.location?.query

    let data = {}

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
        data = { code: 1, msg: '路由错误加载失败' }
    }


    return (
        <>
            <Frame>
                <div style={{ height: 600 }}>
                    {current}---------{id}----{JSON.stringify(data)}
                </div>
            </Frame>
        </>
    )
}


export default ResourceDetail;
