import styles from "./index.less";
import { history } from 'umi';

import {
  Form,
  Input,
  Checkbox,
  Button,
  message,
} from "antd";
import { ProFormTextArea } from "@ant-design/pro-form";
import { createSupplier } from '@/services/user/api'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = (props: any) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (!values.agreement) {
      message.info('请勾选确认查看注册说明')
      return
    }

    let resData = await createSupplier(values).then(res => {
      if (!res?.code) {
        message.success(res.msg)
        props.handleSuccess(true)

        // 暂存用户名
        localStorage.setItem('fdUsername', res?.data?.username)
        console.log('res?.data?.username', res?.data?.username);


      } else {
        message.error(res.msg)
        return;
      }

      console.log('2222222222222222222', res);


      // history.push('/welcome')
      // 后端需要返回token和用户信息，在这里需要存在本地

    }).catch(err => {
      message.error(err)
    })

  };


  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="社会统一信用代码"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="companyName"
        label="公司名称"
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "请再次输入密码",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "两次输入密码不一致"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        name="email"
        label="联系人邮箱"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label={
          <span>
            联系人姓名
          </span>
        }
        rules={[
          {
            required: true,
            message: "请输入联系人姓名",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="联系人电话号码"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="inviter"
        label={
          <span>
            邀请人姓名
          </span>
        }
      >
        <Input />
      </Form.Item>


      <ProFormTextArea
        name="note"
        width="md"
        label="备注"
      />

      <Form.Item
        name="agreement"
        valuePropName="checked"
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default (props: any) => (
  <div className={styles.container}>
    <div id="components-form-demo-register">
      <div className={styles.registerContent}>
        <RegistrationForm {...props} />
      </div>
    </div>
  </div>
);
