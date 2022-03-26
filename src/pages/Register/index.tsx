import Frame from '@/components/Frame';
import styles from './index.less';
import FormRegister from './FormRegister';
import { useState } from 'react';
import Success from './Success';
import { Avatar, Button, Card, Form, Input, message } from 'antd';
import { updateSupplierDetail } from '@/services/user/api'
import { history } from 'umi'

const RegisterComplete = () => {

    const onFinish = async (values: any) => {

        await updateSupplierDetail({ ...values, username: localStorage.getItem('fdUsername' || '') }).then(res => {
            console.log('res', res);
            if (res?.code == 0) {
                message.success('完善成功,跳转登录...')
                localStorage.removeItem('fdUsername')
                history.push('/welcome')
            }

        }).catch(err => {
            console.log(err);
            message.error(err || "网络异常，请稍会儿再重试！")
        })
    }
    return (
        <Form
            onFinish={onFinish}
        >
            <Form.Item
                label="更换头像"
            >
                <Avatar src="http://r8dp8c34q.hn-bkt.clouddn.com/5f6fd5d0-a362-11ec-88cd-638c2ca3f683.png" />
                暂不支持更换
            </Form.Item>
            <Form.Item
                name="shoukuanAccount"
                label="收款银行卡号"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="shoukuan"
                label="收款人/收款公司"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="fukuanAccount"
                label="付款银行卡号"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="fukuan"
                label="付款人/付款公司"
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>

        </Form>
    )
}


const Register: React.FC = () => {
    // 是否注册成功
    const [registerSuccess, setRegisterSuccess] = useState(false)

    // 是否去完善信息
    const [registerComplete, setRegisterComplete] = useState(false)

    const RegisterAndSuccess = () => {

        if (registerSuccess && registerComplete) {
            return <RegisterComplete />
        } else if (registerSuccess) {
            return <Success handleRegisterComplete={setRegisterComplete} />
        } else {
            return <Card><FormRegister handleSuccess={setRegisterSuccess} /></Card>
        }
    }

    return (
        <>
            <Frame>
                <div className={styles.registerWrapper}>
                    <RegisterAndSuccess />
                </div>
            </Frame>
        </>
    );
};

export default Register;
