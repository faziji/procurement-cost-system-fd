import React from 'react';
import { FrameNav } from '@/components/Frame';


const Organization: React.FC = () => {

    const menu = [
        {
            route: '/department',
            itemName: '部门概况', // 唯一
            id: 0
        },
        {
            route: '/department/introduce',
            itemName: '部门简介', // 唯一
            id: 1
        },
        {
            route: '/department/organization',
            itemName: '组织架构', // 唯一
            id: 2
        },
        {
            route: '/department/responsibility',
            itemName: '岗位职责', // 唯一
            id: 3
        },
    ]


    return (
        <>
            <FrameNav menu={menu}>组织架构</FrameNav>
        </>
    )
}

export default Organization