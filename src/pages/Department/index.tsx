import React, { useEffect, useMemo, memo, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { departmentMenu } from '@/resources/index'

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { qiNiuUrl } from '../../../config/qiniuyun'
import styles from './index.less'


const Department: React.FC = (porps: any) => {

    // let url = qiNiuUrl + "DepartmentFD/部门简介.docx"
    const onError = (e: any) => {
        console.log('显示错误');
    }

    const [current, setCurrent] = useState(porps.location.query?.current || 1)

    // 当路由变化参数时更新组件状态
    if (current !== porps.location.query?.current) {
        setCurrent(porps.location.query?.current)
    }

    const FileViewerEle = memo((props) => {
        return (
            <div className={styles.fileViewerWrapper}>
                <FileViewer
                    fileType="docx"
                    filePath={qiNiuUrl + departmentMenu[current || 1].itemName + '.docx'}
                    errorComponent={CustomErrorComponent}
                    onError={onError} />
            </div>
        )
    }, current)


    return (
        <>
            <FrameNav menu={departmentMenu} current={current} onCurrent={setCurrent}>
                <FileViewerEle />
                {/* <Child /> */}
            </FrameNav>
        </>
    )
}

export default Department