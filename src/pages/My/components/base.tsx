import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message, Divider } from 'antd';
import ProForm, { ProFormFieldSet, ProFormText } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { history } from 'umi';
import { getCurrentUserInfo } from '@/services/user/api';
import { getUserInfo, setCurrentUserInfo } from '@/utils';

import styles from './BaseView.less';

// 获取返回加载图片的base64地址
const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => {
  let [avatarProps, setAvatarProps] = useState(avatar);
  const handleUploadAvatar = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // 获取返回图片的base64格式
      getBase64(info.file.originFileObj, (imageUrl: React.SetStateAction<string>) =>
        setAvatarProps(imageUrl),
      );
      message.success('更改头像成功！');
    } else if (info.file.status === 'error') {
      message.error('更改头像失败！');
    }
  };
  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatarProps} alt="avatar" />
      </div>
      <Upload
        data={{ username: localStorage.getItem('username') }}
        onChange={handleUploadAvatar}
        action="http://localhost:3000/api/user/uploadAvatar"
        showUploadList={false}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: any = () => {
  const [currentUser, setCurrentUser] = useState({});
  const userInfo = JSON.parse(getUserInfo() || '{}');
  useEffect(() => {
    getCurrentUserInfo()
      .then((res: any) => {
        if (res?.data == 'noLoginUser' || !currentUser) {
          message.error('用户未登录，跳转登录...');
          history.push('/welcome');
          return;
        }
        setCurrentUser(res?.data || null);
      })
      .catch((err) => {
        console.log('发生了错误', err);
      });
  }, []);

  const handleFinish = async (info: any) => {
    // let info = {
    //   ...data,
    //   // phone: data.phone[0,
    // };
    console.log('提交的数据是', info);

    setCurrentUserInfo({ ...userInfo, ...info });

    message.success('信息更新成功！');

    // 需要替换的本地信息（bug）
    // console.log(userInfo);
    // const userInfoNew

    // baseSettings(info)
    //   .then((result) => {
    //     message.success('更新基本信息成功');
    //   })
    //   .catch((err) => {
    //     message.error('更新基本信息失败');
    //   });
  };

  // const currentUser

  return (
    <div className={styles.baseView}>
      <>
        <div className={styles.left}>
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
              },
            }}
            initialValues={{ ...userInfo }}
            hideRequiredMark
          >
            <ProFormText
              width="md"
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="name"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入您的昵称!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="phone"
              label="联系电话"
              rules={[
                {
                  required: true,
                  message: '请输入您的联系电话!',
                },
                // {
                //   validator: (rule: any, value: any, callback: (message?: string) => void) => {
                //     const mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                //     if (value[0]?.length == 11 || mobile.test(value[0])) {
                //       callback();
                //     } else {
                //       callback('请输入正确的手机号码');
                //     }
                //   },
                // },
              ]}
            />
            <Divider />
            <h2>完善信息</h2>
            <ProFormText width="md" name="shoukuanAccount" label="收款银行账户" />
            <ProFormText width="md" name="shoukuan" label="收款人/公司" />
            <ProFormText width="md" name="fukuanAccount" label="付款银行账户" />
            <ProFormText width="md" name="付款" label="付款人/公司" />
          </ProForm>
          {/* {JSON.stringify(currentUser)} */}
        </div>
        <div className={styles.right}>
          <AvatarView
            avatar={
              userInfo?.avatar ||
              'https://a.msstatic.com/huya/main3/components/helperbar/img/mm_de16b.png'
            }
          />
        </div>
      </>
    </div>
  );
};

export default BaseView;
