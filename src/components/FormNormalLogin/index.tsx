import { Form, Input, Button, Checkbox, Row, Col, message, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import UserOutlined from "@ant-design/icons"
// import LockOutlined from "@ant-design/icons"

import { login, getCurrentUserInfo } from '@/services/user/api'
import { useState } from "react";
import { getToken, getUerInfo } from "@/utils";


const NormalLoginForm = (props: any) => {
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
        props.handleLogined(true)
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
      style={{ height: 270 }}
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
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 245 }}>
          登录
        </Button>
        <p style={{ color: '#767676' }}>注册登录即表示同意<a href="">用户协议</a>、<a href="">隐私政策</a></p>
      </Form.Item>
    </Form>
  );
};

/**
 * 已登录表格
 */
const NormalLoginedForm = (props: any) => {
  /**
   * 退出登录
   * 删除fdToken和fdUserInfo
   */
  const removelocalStorage = () => {

    localStorage.removeItem('fdToken')
    localStorage.removeItem('fdUserInfo')
    props.handleLogined(false)
    message.success('退出登录成功！')
  }

  /**
   * 从本地获取用户信息
   */
  const userInfo = JSON.parse(getUerInfo() || "")

  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{ height: 270 }}
    >

      <Form.Item>
        {getUerInfo()}
        登录成功,
        <a onClick={removelocalStorage}>[退出登录]</a>
      </Form.Item>
    </Form>
  )
}



const FormNormalLogin = () => {
  // 登录状态
  const [logined, setLogined] = useState(!!getToken())
  return logined ? <NormalLoginedForm handleLogined={setLogined} /> : <NormalLoginForm handleLogined={setLogined} />

}

export default FormNormalLogin;