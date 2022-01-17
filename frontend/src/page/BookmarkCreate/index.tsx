import { message, PageHeader } from 'antd';
import metaApi from 'api/metaApi';
import { BookmarkForm, BookmarkFormData } from 'component/BookmarkForm';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import styles from './BookmarkCreate.module.scss';

// const { auth } = metaApi;

export const BookmarkCreate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const parentId = params.parentId as string;

  const onFinish = async ({ name, url, info }: BookmarkFormData) => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        await api.bookmark.create({ name, url, info, parentId });
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
      <PageHeader className={styles.header} title="New Bookmark" />
      <div className={styles.bookmarkCreate}>
        <BookmarkForm
          bookmarkData={{ name: '', url: '', info: '' }}
          buttonName="Create"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </div>
  );
};
