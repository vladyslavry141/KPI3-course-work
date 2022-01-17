import { Typography } from 'antd';
import styles from './Forbidden.module.scss';

// const { auth } = metaApi;

export const Forbidden = () => {
  return (
    <div className={styles.page}>
      <Typography.Title level={1}>403 Forbidden</Typography.Title>
    </div>
  );
};
