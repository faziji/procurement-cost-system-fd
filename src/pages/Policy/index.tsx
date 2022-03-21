import React, { useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { policyMenu } from '@/resources/index'


const Policy: React.FC = (porps: any) => {

    const [current, setCurrent] = useState(porps.location.query?.current || 1)

    // 当路由变化参数时更新组件状态
    if (current !== porps.location.query?.current) {
        setCurrent(porps.location.query?.current)
    }

    return (
        <>
            <FrameNav menu={policyMenu} current={current} onCurrent={setCurrent}>政策法规{current}</FrameNav>
        </>
    )
}

export default Policy