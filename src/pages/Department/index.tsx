import React, { useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { departmentMenu } from '@/resources/index'
// import {url}
// const { url } = require("../../../config/qiniuyun").qiniuyn;
import { qiNiuUrl } from '../../../config/qiniuyun'



const Department: React.FC = (porps: any) => {

    let url = qiNiuUrl + "DepartmentFD/部门简介.docx"

    const [current, setCurrent] = useState(porps.location.query?.current || 1)

    // 当路由变化参数时更新组件状态
    if (current !== porps.location.query?.current) {
        setCurrent(porps.location.query?.current)
    }

    return (
        <>
            <FrameNav menu={departmentMenu} current={current} onCurrent={setCurrent}>部门简介{current}</FrameNav>
        </>
    )
}

export default Department