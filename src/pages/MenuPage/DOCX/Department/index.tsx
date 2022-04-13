import React, { useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { departmentMenu } from '@/resources/index'
import styles from './index.less';


import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { qiNiuUrl } from '../../../../../config/qiniuyun'
import { memo } from "react";

const Department: React.FC = (props: any) => {

    const [current, setCurrent] = useState(props.location.query?.current || 1)

    const onError = (e: any) => {
        console.log('显示错误');
    }

    const FileViewerEle = memo((props: any) => {
        return (
            <div className={styles.fileViewerWrapper}>
                <FileViewer
                    fileType="docx"
                    filePath={qiNiuUrl + 'ResourcesFD/' + departmentMenu[current || 1].itemName + '.docx'}
                    errorComponent={CustomErrorComponent}
                    onError={onError} />
            </div>
        )
    }, current)

    return (
        <>
            <FrameNav menu={departmentMenu} current={current} onCurrent={setCurrent} {...props} >
                {/* 留空添加额外的组件 */}
                <FileViewerEle />
            </FrameNav>
        </>
    )
}

export default Department