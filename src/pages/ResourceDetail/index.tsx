import Frame from '@/components/Frame';
import ProForm, {
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProFormRate,
  ProFormSelect,
  ProFormDigit,
  ProFormSlider,
  ProFormGroup,
  ProFormDigitRange,
  ProFormUploadDragger,
  ProFormUploadButton,
} from '@ant-design/pro-form';

import { getUserInfo } from '../../utils';

import {
  detailConsultation,
  detailPurchaseAnnouncement,
  detailResultAnnouncement,
  detailCorrectAnnouncement,
} from '@/services/resource/api';

import { createTender, getTenderList } from '@/services/tender/api';
import Icon, { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import styles from './index.less';

import { qiNiuUrl } from '../../../config/qiniuyun';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { Affix, Alert, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

const ResourceDetail: React.FC = (props: any) => {
  const { current, id } = props.location?.query;
  // 是否已投标
  const [tendered, setTendered] = useState(false);
  // 是否申请通过
  const [applyed, setApplyed] = useState(false);
  // 是否被禁用账号
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const { username: supplierUsername, role, status } = JSON.parse(getUserInfo() || '{}');
    console.log('判断是否已投标', supplierUsername, id);

    if (role == 'supplier') {
      setApplyed(true);
    }
    if (status !== 'enable') {
      setForbidden(true);
    }

    getTenderList({ supplierUsername, announcementId: id })
      .then((res) => {
        console.log('已投标', res, tendered);
        const { data } = res;
        if (data?.length) {
          // message.info('该项目您已投标！');
          setTendered(true);
          return;
        }
      })
      .catch((err) => {
        message.error(err);
      });
  });

  const [tenderPageVisiable, setTenderPageVisiable] = useState(false);
  // const [result, setResult] = useState({});

  let data: any = {};

  if (current == 1) {
    const consultationListRes = useRequest(() => {
      return detailConsultation({ id });
    });
    data = consultationListRes?.data;
  } else if (current == 2) {
    const detailPurchaseAnnouncementRes = useRequest(() => {
      return detailPurchaseAnnouncement({ id });
    });
    data = detailPurchaseAnnouncementRes?.data;
    // setResult(data);
  } else if (current == 3) {
    const detailResultAnnouncementRes = useRequest(() => {
      return detailResultAnnouncement({ id });
    });
    data = detailResultAnnouncementRes?.data;
  } else if (current == 4) {
    const detailCorrectAnnouncementRes = useRequest(() => {
      return detailCorrectAnnouncement({ id });
    });
    data = detailCorrectAnnouncementRes?.data;
  } else {
    data = { name: '网络异常' };
  }

  const onError = (e: any) => {
    console.log('显示错误');
  };

  const handleTender = () => {
    console.log('我要投标');
    setTenderPageVisiable(true);
  };

  const submitTender = async (value: any) => {
    // console.log('submitTender', value, data);
    // console.log('getUserInfo', JSON.parse(getUserInfo() || '{}'));
    const { username: supplierUsername, companyName: supplierName } = JSON.parse(
      getUserInfo() || '{}',
    );
    const reqData = {
      announcementId: data.id,
      announcementName: data.name,
      supplierUsername,
      supplierName,
      attachment: '', // 假数据
      ...value,
    };

    console.log('提交的数据是', reqData);

    await createTender(reqData)
      .then((res) => {
        console.log('成功返回', res);
        message.success('投标成功！');
      })
      .catch((err) => {
        console.log('错误', err);
      });

    console.log('返回的数据是');
  };

  const [top, setTop] = useState(10);

  return (
    <>
      <Frame>
        <div className={styles.contentWrapper}>
          <div className={styles.contentTitle}>
            <div className={styles.contentTitleText}>{data?.name}</div>
            <div className={styles.contentTitleDesc}>
              发布时间：{data?.publishTime}{' '}
              <p>
                | <EyeOutlined />
              </p>
              浏览次数：{data?.viewTime}
            </div>
            <div className={styles.tenderButton}>
              {current == 2 && !tenderPageVisiable && (
                <Button
                  style={{ width: 200 }}
                  type="primary"
                  onClick={handleTender}
                  disabled={tendered || !applyed}
                >
                  {tendered ? '已投标' : '我要投标'}
                </Button>
              )}
            </div>

            <div>
              {(!applyed || forbidden) && (
                <Alert
                  style={{ width: 350, marginLeft: 520 }}
                  message="未登录、审核未通过、禁用账户无法投标！"
                  type="warning"
                  showIcon
                />
              )}
            </div>
            <Affix offsetTop={top}>
              {/* <Button type="primary" onClick={() => setTop(top + 10)} shape="round">
                <>
                  <PlusOutlined />
                  关注
                </>
              </Button> */}
              <Button type="primary" onClick={() => setTop(top + 10)} shape="round" disabled>
                <>
                  <PlusOutlined />
                  已关注
                </>
              </Button>
            </Affix>
          </div>

          {/* {current}---------{id}----{JSON.stringify(data)}---{qiNiuUrl} */}
          {/* 会有一个bug，资源无法访问的时候会一直 */}
          {/* 不是采购公告 */}
          {data?.key && current != 2 ? (
            <FileViewer
              fileType="docx"
              filePath={qiNiuUrl + data?.key}
              errorComponent={CustomErrorComponent}
              onError={onError}
            />
          ) : null}
          {/* 采购公告 */}
          {data?.key && current == 2 && !tenderPageVisiable ? (
            <FileViewer
              fileType="docx"
              filePath={qiNiuUrl + data?.key}
              errorComponent={CustomErrorComponent}
              onError={onError}
            />
          ) : null}
          {/* 投标页面 */}
          {tenderPageVisiable && (
            <>
              <Button onClick={() => setTenderPageVisiable(false)}>返回</Button>
              <div className={styles.proFormWrapper}>
                <ProForm
                  onValuesChange={(_, values) => {
                    console.log(values);
                  }}
                  onFinish={async (value) => submitTender(value)}
                  initialValues={{
                    ...data,
                    announcementId: id,
                  }}
                  style={{ marginLeft: 520 }}
                >
                  <ProFormGroup>
                    {/* <ProFormText width="md" name="announcementId" label="采购公告ID" disabled /> */}
                    {/* <ProFormText width="md" name="name" label="采购公告名称" disabled /> */}
                    <ProFormText
                      width="md"
                      name="amount"
                      label="投标金额（元）"
                      rules={[
                        {
                          required: true,
                          message: '请输入投标金额',
                        },
                      ]}
                    />
                    {/* <ProFormText width="md" name="attachment" label="附件" disabled /> */}
                  </ProFormGroup>
                  <ProFormUploadButton
                    name="attachment1" // 假数据
                    label="上传附件"
                    max={2}
                    fieldProps={{
                      name: 'file',
                      listType: 'picture-card',
                    }}
                    action="/upload.do"
                    // extra="longgggggggggggggggggggggggggggggggggg"
                  />
                </ProForm>
              </div>
            </>
          )}
        </div>
      </Frame>
    </>
  );
};

export default ResourceDetail;
