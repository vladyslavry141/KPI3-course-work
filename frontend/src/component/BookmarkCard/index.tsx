import { LinkOutlined, MoreOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Menu, Row, Typography } from 'antd';
import { Bookmark } from 'api/metaApi';
import { useNavigate } from 'react-router-dom';
import styles from './BookmarkCard.module.scss';

export interface BookmarkCardProps {
  bookmarkData: Bookmark;
}

export const BookmarkCard = ({
  bookmarkData: { bookmarkId, name, url, info },
}: BookmarkCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className={styles.bookmarkCard}>
      <Row gutter={[10, 10]}>
        <Col>
          <LinkOutlined className={styles.linkIcon} />
        </Col>
        <Col flex={1} className={styles.bookmarkName}>
          <Typography.Link href={url} target="_blank" ellipsis>
            {name}
          </Typography.Link>
        </Col>
        <Col>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="edit"
                  onClick={async () => navigate(`/bookmark/${bookmarkId}/edit`)}
                >
                  Edit
                </Menu.Item>
              </Menu>
            }
          >
            <MoreOutlined />
          </Dropdown>
        </Col>
      </Row>
    </Card>
  );
};
