import { Typography } from 'antd';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.page}>
      <Typography.Title level={1}>404 Not Found</Typography.Title>
    </div>
  );
};
