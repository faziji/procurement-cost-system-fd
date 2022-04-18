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

import {
  createTender,
  getTenderList,
  getAttentionList,
  createAttention,
  deleteAttention,
} from '@/services/tender/api';
import Icon, { EyeOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import styles from './index.less';

import { qiNiuUrl } from '../../../config/qiniuyun';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { Affix, Alert, Button, message } from 'antd';
import { useEffect, useState } from 'react';

const ResourceDetail: React.FC = (props: any) => {
  const { current, id } = props.location?.query;
  // 是否已投标
  const [tendered, setTendered] = useState(false);
  // 是否申请通过
  const [applyed, setApplyed] = useState(false);
  // 是否被禁用账号
  const [forbidden, setForbidden] = useState(false);

  // 是否已关注
  const [attention, setAttention] = useState(false);

  // 是否登录
  // const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 获取用户信息
    const { username: supplierUsername, role, status } = JSON.parse(getUserInfo() || '{}');
    console.log('判断是否已投标', supplierUsername, id);

    if (role == 'supplier') {
      setApplyed(true);
    }
    if (status !== 'enable') {
      setForbidden(true);
    }
    const reqData = {
      username: supplierUsername,
      announcementId: id,
      announcementType:
        current == 1
          ? 'consultation'
          : current == 2
          ? 'purchaseannouncement'
          : current == 3
          ? 'resultannouncement'
          : 'correctannouncement',
      // current
    };

    // 查看是否已关注
    getAttentionList(reqData)
      .then((res) => {
        console.log('关注返回的信息是', res);
        if (res?.data?.length == 0) {
          setAttention(false);
        } else {
          setAttention(true);
        }
      })
      .catch((err) => {
        console.log('发生了错误', err);
      });
    console.log('11111111111111111111', reqData);

    // 查看是否已投标
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
  }, []);

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
    // if (supplierName) setIsLogin(true);

    console.log('返回的数据是');
  };

  const [top, setTop] = useState(10);

  const isLogin = !!JSON.parse(getUserInfo() || '{}').username;

  const handleAttention = async (data: any) => {
    const username = JSON.parse(getUserInfo() || '{}')?.username;
    console.log('点击了关注', data, username);
    const announcement = [
      'consultation',
      'purchaseannouncement',
      'resultannouncement',
      'correctannouncement',
    ];
    await createAttention({
      username,
      announcementId: data?.id,
      announcementName: data?.name,
      announcementType: announcement[current - 1],
      announcementDescription: data?.description,
    })
      .then((res) => {
        console.log('关注成功', res);
        message.info('关注成功！');
        setAttention(true);
      })
      .catch((err) => {
        console.log('关注发生了错误', err);
        message.error('网络异常，请稍后重试！');
      });
  };
  const cancelAttention = async (data: any) => {
    const username = JSON.parse(getUserInfo() || '{}')?.username;
    console.log('点击了关注', data, username);
    const announcement = [
      'consultation',
      'purchaseannouncement',
      'resultannouncement',
      'correctannouncement',
    ];
    const reqData = {
      username,
      announcementId: data?.id,
      // announcementName: data?.name,
      announcementType: announcement[current - 1],
      // announcementDescription: data?.description,
    };
    console.log('11111111取消关注', reqData);

    await deleteAttention(reqData)
      .then((res) => {
        console.log('取消关注成功', res);
        message.success('取消关注成功！');
        // setAttention(true);
        setAttention(false);
      })
      .catch((err) => {
        message.error('网络异常，请稍后重试！');
        console.log('取消关注发生了错误', err);
      });
  };

  return (
    <>
      <Frame>
        {/* {isLogin ? '已登录' : '未登录'} */}
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
              {!attention && isLogin && (
                <Button
                  type="primary"
                  onClick={() => {
                    setTop(top + 10), handleAttention(data);
                  }}
                  shape="round"
                >
                  <>
                    <PlusOutlined />
                    关注
                  </>
                </Button>
              )}
              {attention && isLogin && (
                <Button
                  type="dashed"
                  onClick={() => {
                    setTop(top + 10), cancelAttention(data);
                  }}
                  shape="round"
                >
                  <>
                    <MinusOutlined />
                    取消关注
                  </>
                </Button>
              )}
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
