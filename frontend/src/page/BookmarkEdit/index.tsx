import { Button, message, PageHeader } from 'antd';
import metaApi, { Bookmark } from 'api/metaApi';
import { BookmarkForm, BookmarkFormData } from 'component/BookmarkForm';
import { Loader } from 'component/Loader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './BookmarkEdit.module.scss';

// const { auth } = metaApi;

export const BookmarkEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [bookmark, setBookmark] = useState<Bookmark | undefined>();
  useEffect(() => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        const response = await api.bookmark.get({
          id: params.bookmarkId as string,
        });
        setBookmark(response.bookmark);
      } catch (error) {
        const { code } = error as { code: number };
        if (code === 404) navigate('/notfound');
        if (code === 403) navigate('/forbidden');
      }
    })();
  }, []);

  if (!bookmark) return <Loader />;
  const onFinish = async ({ name, url, info }: BookmarkFormData) => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        await api.bookmark.update({
          id: bookmark.bookmarkId,
          delta: {
            name,
            url,
            info,
          },
        });
        message.success('Succesfully update');
        navigate(`/folder/${bookmark.parentId}`);
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
        title={bookmark.name}
        extra={[
          <Button
            key="delete"
            className={styles.deleteButton}
            type="primary"
            onClick={async () => {
              const api = await metaApi.getInstance();
              try {
                await api.bookmark.delete({
                  id: bookmark.bookmarkId,
                });
                message.success('Succesfully deleted');
                navigate(`/folder/${bookmark.parentId}`);
              } catch (error) {
                const { code } = error as { code: number };
                if (code === 404) navigate('/notfound');
                if (code === 403) navigate('/forbidden');
              }
            }}
          >
            Delete
          </Button>,
        ]}
      />
      <div className={styles.bookmarkEdit}>
        <BookmarkForm
          bookmarkData={{ ...bookmark }}
          buttonName="Update"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </div>
  );
};
