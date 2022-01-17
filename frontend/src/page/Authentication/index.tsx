import { Button, Form, Input, message, PageHeader } from 'antd';
import metaApi from 'api/metaApi';
import { useAppDispatch } from 'app/hook';
import { add } from 'app/reducer/account';
import { useNavigate } from 'react-router';
import styles from './Authentification.module.scss';

// const { auth } = metaApi;

export const Authentication = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    (async () => {
      try {
        const api = await metaApi.getInstance();
        const { id, token } = await api.auth.signin({ login, password });
        localStorage.setItem('browser.token', token);
        dispatch(add({ accountId: id, status: 'logged' }));
        navigate('/root');
      } catch (e) {
        message.error((e as Error).message);
      }
    })();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        className={styles.header}
        title="Log in"
        extra={[
          <Button
            key="registration"
            type="primary"
            onClick={async () => {
              navigate('/registration');
            }}
          >
            Registration
          </Button>,
        ]}
      />
      <div className={styles.authentification}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.form}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
