import { message, PageHeader } from 'antd';
import metaApi from 'api/metaApi';
import { FolderForm, FolderFormData } from 'component/FolderForm';
import { useNavigate, useParams } from 'react-router';
import styles from './FolderCreate.module.scss';

// const { auth } = metaApi;

export const FolderCreate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const parentId = params.parentId as string;

  const onFinish = async ({ name }: FolderFormData) => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        await api.folder.create({ name, parentId });
      } catch (error) {
        const { code } = error as { code: string };
        if (code === '404') navigate('/notfound');
        if (code === '403') navigate('/forbidden');
      }
      message.success('Succesfully create');
      navigate(`/folder/${parentId}`);
    })();
  };

  const onFinishFailed = async (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.page}>
      <PageHeader className={styles.header} title="New folder" />
      <div className={styles.folderCreate}>
        <FolderForm
          folderData={{ name: '' }}
          buttonName="Create"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </div>
  );
};
