import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import type { CurrentUser, TagType, tabKeyType } from './data.d';
import { queryCurrent } from './service';
import styles from './Center.less';


const Center: React.FC<RouteChildrenProps> = () => {

  //  获取用户信息
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  //  渲染用户信息
  const renderUserInfo = ({ name, email, phone }: Partial<CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {name}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          {email}
        </p>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {phone}
        </p>
        <p>
          其他信息：{JSON.stringify(currentUser)}
        </p>
      </div>
    );
  };


  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={24} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser?.signature}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
