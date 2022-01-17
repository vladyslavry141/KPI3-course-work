import metaApi, { Folder } from 'api/metaApi';
import { BookmarkManager } from 'component/BookmarkManager';
import { Loader } from 'component/Loader';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './Browser.module.scss';

// const { auth } = metaApi;

export const Browser = () => {
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
        console.dir(error);
        const { code } = error as { code: number };
        console.dir({ code });
        if (code === 404) navigate('/notfound');
        console.log('founded');
        if (code === 403) navigate('/forbidden');
        console.log('Alowed');
      }
    })();
  }, [params]);

  if (!folder) return <Loader />;
  if (!folder.parentId) return <Navigate to="/root" />;
  return (
    <div className={styles.page}>
      <BookmarkManager parentId={folder.folderId} title={folder.name} />
    </div>
  );
};
