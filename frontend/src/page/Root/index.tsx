import metaApi, { Folder } from 'api/metaApi';
import { BookmarkManager } from 'component/BookmarkManager';
import { Loader } from 'component/Loader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Root.module.scss';

export const Root = () => {
  const navigate = useNavigate();
  const [folder, setFolder] = useState<Folder | undefined>();
  useEffect(() => {
    (async () => {
      const api = await metaApi.getInstance();
      try {
        setFolder(await api.folder.getRoot().then(({ folder }) => folder));
      } catch (error) {
        const { code } = error as { code: string };
        if (code === '404') navigate('/notfound');
        if (code === '403') navigate('/forbidden');
      }
    })();
  }, []);
  if (!folder) return <Loader />;
  return (
    <div className={styles.page}>
      <BookmarkManager parentId={folder?.folderId as string} title="Root" />
    </div>
  );
};
