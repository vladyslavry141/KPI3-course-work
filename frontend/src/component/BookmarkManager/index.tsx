import {
  Button,
  Col,
  Divider,
  Dropdown,
  Menu,
  PageHeader,
  Row,
  Typography,
} from 'antd';
import metaApi, { Bookmark, Folder, ID } from 'api/metaApi';
import { BookmarkCard } from 'component/BookmarkCard';
import { FolderCard } from 'component/FolderCard';
import { Loader } from 'component/Loader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './BookmarkManager.module.scss';

export interface BookmarkManagerProps {
  parentId: ID;
  title: string;
}

export const BookmarkManager = ({ parentId, title }: BookmarkManagerProps) => {
  const navigate = useNavigate();
  const [managerData, setManagerData] = useState<
    { folders: Folder[]; bookmarks: Bookmark[] } | undefined
  >();
  useEffect(() => {
    (async () => {
      const api = await metaApi.getInstance();
      const folders = await api.folder
        .getByFolder({ id: parentId })
        .then(({ data }) => data);
      const bookmarks = await api.bookmark
        .getByFolder({ id: parentId })
        .then(({ data }) => data);
      setManagerData({ folders, bookmarks });
    })();
  }, []);

  if (!managerData) return <Loader />;
  return (
    <>
      <PageHeader
        className={styles.header}
        title={title}
        extra={[
          <Dropdown
            key="add"
            overlay={
              <Menu>
                <Menu.Item
                  key="bookmark"
                  onClick={async () => navigate(`/bookmark/create/${parentId}`)}
                >
                  Add bookmark{' '}
                </Menu.Item>
                <Menu.Item
                  key="folder"
                  onClick={async () => navigate(`/folder/create/${parentId}`)}
                >
                  Add folder
                </Menu.Item>
              </Menu>
            }
          >
            <Button key="add" type="primary">
              Add
            </Button>
          </Dropdown>,
        ]}
      />
      <div className={styles.bookmarkManager}>
        <Typography.Title level={4}>Folder</Typography.Title>
        <Row gutter={[10, 10]} className={styles.row}>
          {managerData.folders.map((folderData) => (
            <Col span={4} key={folderData.folderId}>
              <FolderCard folderData={folderData} />
            </Col>
          ))}
        </Row>
        <Divider />
        <Typography.Title level={4}>Bookmark</Typography.Title>
        <Row gutter={[10, 10]} className={styles.row}>
          {managerData.bookmarks.map((bookmarkData) => (
            <Col span={4} key={bookmarkData.bookmarkId}>
              <BookmarkCard bookmarkData={bookmarkData} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
