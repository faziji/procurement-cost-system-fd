import { DingdingOutlined } from '@ant-design/icons';
import { Button, Card, Steps, Result, Descriptions, message } from 'antd';
import { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { history } from 'umi';

import styles from './index.less';

const { Step } = Steps;

const desc1 = (
  <div className={styles.title}>
    <div style={{ margin: '8px 0 4px' }}>
      <span>曲丽丽</span>
      <DingdingOutlined style={{ marginLeft: 8, color: '#00A0E9' }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12 }} className={styles.title}>
    <div style={{ margin: '8px 0 4px' }}>
      <span>诸人事</span>
      <a
        onClick={() => {
          message.info('当前处于正常时效，请耐心等待！');
          return;
        }}
      >
        <DingdingOutlined style={{ color: '#00A0E9', marginLeft: 8 }} />
        <span>催一下</span>
      </a>
    </div>
  </div>
);

const content = (
  <>
    <Descriptions title="项目名称">
      <Descriptions.Item label="项目 ID">23421</Descriptions.Item>
      <Descriptions.Item label="负责人">曲丽丽</Descriptions.Item>
      <Descriptions.Item label="生效时间">2016-12-12 ~ 2017-12-12</Descriptions.Item>
    </Descriptions>
    <br />
    <Steps progressDot current={1}>
      <Step title={<span style={{ fontSize: 14 }}>创建项目</span>} description={desc1} />
      <Step title={<span style={{ fontSize: 14 }}>部门初审</span>} description={desc2} />
      <Step title={<span style={{ fontSize: 14 }}>财务复核</span>} />
      <Step title={<span style={{ fontSize: 14 }}>完成</span>} />
    </Steps>
  </>
);

const extra = (handleRegisterComplete: any) => {
  return (
    <Fragment>
      <Button type="primary" onClick={() => history.push('/welcome')}>
        登录
      </Button>
      <Button onClick={() => handleRegisterComplete(true)}>去完善信息</Button>
    </Fragment>
  );
};

export default ({ handleRegisterComplete }: any) => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title="提交注册申请成功！"
        subTitle="注册需要经过公司财务部门和专家进行审核，当前状态可以正常登录，暂无法进行投标！完善资料更容易快速通过审核哦！"
        extra={extra(handleRegisterComplete)}
        style={{ marginBottom: 16 }}
      >
        {content}
      </Result>
    </Card>
  </GridContent>
);
