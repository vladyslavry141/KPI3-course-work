import { Button, message, PageHeader } from 'antd';
import metaApi, { Folder } from 'api/metaApi';
import { FolderForm, FolderFormData } from 'component/FolderForm';
import { Loader } from 'component/Loader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './FolderEdit.module.scss';

// const { auth } = metaApi;

export const FolderEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [folder, setFolder] = useState<Folder | undefined>();

  useEffect(() => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        const response = await api.folder.get({
          id: params.folderId as string,
        });
        setFolder(response.folder);
      } catch (error) {
        const { code } = error as { code: number };
        if (code === 404) navigate('/notfound');
        if (code === 403) navigate('/forbidden');
      }
    })();
  }, []);

  if (!folder) return <Loader />;
  const onFinish = async ({ name }: FolderFormData) => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        await api.folder.update({
          id: folder.folderId,
          delta: {
            name,
          },
        });
        message.success('Succesfully update');
        navigate(`/folder/${folder.parentId}`);
      } catch (error) {
        const { code } = error as { code: number };
        if (code === 404) navigate('/notfound');
        if (code === 403) navigate('/forbidden');
      }
    })();
  };

  const onFinishFailed = async (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        className={styles.header}
        title={folder.name}
        extra={[
          <Button
            key="delete"
            type="primary"
            className={styles.deleteButton}
            onClick={async () => {
              const api = await metaApi.getInstance();
              try {
                await api.folder.delete({
                  id: folder.folderId,
                });
                message.success('Succesfully deleted');
                navigate(`/folder/${folder.parentId}`);
              } catch (error) {
                const { code } = error as { code: number };
                if (code === 404) navigate('/notfound');
                if (code === 403) navigate('/forbidden', { replace: true });
              }
            }}
          >
            Delete
          </Button>,
        ]}
      />
      <div className={styles.folderEdit}>
        <FolderForm
          folderData={folder}
          buttonName="Update"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </div>
  );
};
