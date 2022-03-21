import React, { useState } from 'react';
import { FrameNav } from '@/components/Frame';


const Responsibility: React.FC = (porps: any) => {

    const [current, setCurrent] = useState(porps.location.query?.current || 1)

    // 当路由变化参数时更新组件状态
    if (current !== porps.location.query?.current) {
        setCurrent(porps.location.query?.current)
    }

    const menu = [
        {
            route: '/department',
            itemName: '部门概况', // 唯一
            id: 0
        },
        {
            route: '/department',
            itemName: '部门简介', // 唯一
            id: 1
        },
        {
            route: '/department',
            itemName: '组织架构', // 唯一
            id: 2
        },
        {
            route: '/department',
            itemName: '岗位职责', // 唯一
            id: 3
        },
    ]


    return (
        <>
            <FrameNav menu={menu} current={current} onCurrent={setCurrent}>部门简介{current}</FrameNav>
        </>
    )
}

export default Responsibility