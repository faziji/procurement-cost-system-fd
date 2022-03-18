import styles from "./index.less";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login, getCurrentUserInfo } from '@/services/user/api'

const NormalLoginForm = () => {
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    let res = await login(values)

    if (res?.code) {
      message.error(res?.msg)
      localStorage.removeItem('fdToken')
      localStorage.removeItem('fdUserInfo')
    } else {
      localStorage.setItem('fdToken', res?.data?.token || "")

      try {
        let resData = await getCurrentUserInfo();
        localStorage.setItem('fdUserInfo', JSON.stringify(resData?.data))
        message.success("登录成功！")
      } catch (error) {
        localStorage.removeItem('fdToken')
        message.error("获取用户信息失败")
      }

    }
    console.log("Response login of form:", res);

  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          allowClear
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
        <a href="" style={{ marginLeft: '10px' }}>用户注册</a>


        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        <p style={{ color: '#767676' }}>注册登录即表示同意<a href="">用户协议</a>、<a href="">隐私政策</a></p>
      </Form.Item>
      <Form.Item>
        <Row>
          <Col span={8}>
            <div className={styles.loginFormEntry1} >
              <div className={styles.entryWrapper}>
                <img className={styles.imagePic} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png" alt="" />
                <p>供应商入口</p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.loginFormEntry2} >
              <div className={styles.entryWrapper}>
                <img className={styles.imagePic} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png" alt="" />
                <p>管理后台</p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.loginFormEntry3} >
              <div className={styles.entryWrapper}>
                <img className={styles.imagePic} src="http://www2.scut.edu.cn/_upload/tpl/09/04/2308/template2308/img/icon-ds.png" alt="" />
                <p>管理后台</p>
              </div>
            </div>
          </Col>

        </Row>
      </Form.Item>

    </Form>
  );
};

export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-normal-login">
      <NormalLoginForm />
    </div>
  </div>
);
