import { FolderOutlined, MoreOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Menu, Row, Typography } from 'antd';
import { Folder } from 'api/metaApi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './FolderCard.module.scss';

export interface FolderCardProps {
  folderData: Folder;
}

export const FolderCard = ({
  folderData: { name, folderId },
}: FolderCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className={styles.folderCard}>
      <Row gutter={[10, 10]}>
        <Col>
          <FolderOutlined className={styles.folderIcon} />
        </Col>
        <Col className={styles.folderName} flex={1}>
          <Typography.Link ellipsis>
            <Link to={`/folder/${folderId}`}>{name}</Link>
          </Typography.Link>
        </Col>
        <Col>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="edit"
                  onClick={async () => navigate(`/folder/${folderId}/edit`)}
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
