import React, { useState } from 'react';
import { FrameNav } from '@/components/Frame';
import { departmentMenu } from '@/resources/index'

const Department: React.FC = (props: any) => {

    const [current, setCurrent] = useState(props.location.query?.current || 1)

    return (
        <>
            <FrameNav menu={departmentMenu} current={current} onCurrent={setCurrent} {...props} >
                {/* 留空添加额外的组件 */}
            </FrameNav>
        </>
    )
}

export default Department