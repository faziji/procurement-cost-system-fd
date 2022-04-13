import Frame from "@/components/Frame";
import { detailConsultation, detailPurchaseAnnouncement, detailResultAnnouncement, detailCorrectAnnouncement } from "@/services/resource/api";
import { EyeOutlined } from "@ant-design/icons";
import { useRequest } from "umi";
import styles from './index.less'

import { qiNiuUrl } from '../../../config/qiniuyun'
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';




const GuideDetail: React.FC = (props: any) => {
    const data = props.location?.query

    // let data: any = {}



    const onError = (e: any) => {
        console.log('显示错误');
    }

    return (
        <>
            <Frame>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentTitle}>
                        <div className={styles.contentTitleText}>
                            <h3>
                                {data?.name}
                            </h3>
                        </div>
                        <div className={styles.contentTitleDesc}>
                            发布时间：{data?.createdAt}
                            {/* <p>| <EyeOutlined /></p> */}
                            {/* 浏览次数：{data?.viewTime} */}
                        </div>
                    </div>

                    {/* {current}---------{id}----{JSON.stringify(data)}---{qiNiuUrl} */}
                    {/* 会有一个bug，资源无法访问的时候会一直 */}
                    {data?.key ?
                        <FileViewer
                            fileType="docx"
                            filePath={qiNiuUrl + "Resources/" + data?.key}
                            errorComponent={CustomErrorComponent}
                            onError={onError} />
                        : null
                    }

                    {/* {key}--- */}

                </div>
            </Frame>
        </>
    )
}


export default GuideDetail;
