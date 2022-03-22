import React, { useEffect, useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { partyMenu } from '@/resources/index'


const Party: React.FC = (props: any) => {
    const [current, setCurrent] = useState(props.location.query?.current || 1)
    return (
        <>
            <FrameNav menu={partyMenu} current={current} onCurrent={setCurrent} {...props} >
                {/* 留空添加额外的组件 */}
            </FrameNav>
        </>
    )
}

export default Party


