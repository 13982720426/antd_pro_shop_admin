import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {  Tabs } from 'antd';
import React,{useEffect} from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect,history } from 'umi';
import styles from './index.less';


const Login = (props) => {
  useEffect(()=>{
    // 判断如果已经登录过，直接去首页
    const userInfo=localStorage.getItem("userInfo")
    if(userInfo) history.replace('/')
  },[])

  const {submitting } = props;
 

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values},
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey="account">
          <Tabs.TabPane
            key="account"
            tab="账号密码登录"
          />

        </Tabs>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="邮箱：super@a.com"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱"
                },
                {
                  type: "email",
                  message: "请输入正确的邮箱格式"
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码：123123"
              rules={[
                {
                  required: true,
                  message: "请输入密码"
                },
              ]}
            /> 
        <div
          style={{
            marginBottom: 24,
          }}
        >
        </div>
      </ProForm>

    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
