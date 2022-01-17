import { Button, Form, Input, message, PageHeader } from 'antd';
import metaApi from 'api/metaApi';
import { useAppDispatch } from 'app/hook';
import { add } from 'app/reducer/account';
import { useNavigate } from 'react-router-dom';
import styles from './Registration.module.scss';

// const { auth } = metaApi;

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = ({
    login,
    password,
    email,
  }: {
    login: string;
    password: string;
    email: string;
  }) => {
    (async () => {
      try {
        const api = await metaApi.getInstance();
        const { id, token } = await api.auth.register({
          login,
          password,
          email,
        });
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
        title="Registration"
        extra={[
          <Button
            key="login"
            type="primary"
            onClick={async () => {
              navigate('/login');
            }}
          >
            Log in
          </Button>,
        ]}
      />
      <div className={styles.registration}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your Email!',
              },
            ]}
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
