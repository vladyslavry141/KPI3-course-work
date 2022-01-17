import 'antd/dist/antd.css';
import metaApi, { PageStatus } from 'api/metaApi';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { add, selectAccount } from 'app/reducer/account';
import { Loader } from 'component/Loader';
import { PrivateRoute } from 'component/PrivateRoute';
import { Authentication } from 'page/Authentication';
import { BookmarkCreate } from 'page/BookmarkCreate';
import { BookmarkEdit } from 'page/BookmarkEdit';
import { Browser } from 'page/Browser';
import { FolderCreate } from 'page/FolderCreate';
import { FolderEdit } from 'page/FolderEdit';
import { Forbidden } from 'page/Forbidden';
import { NotFound } from 'page/NotFound';
import { Registration } from 'page/Registration';
import { Root } from 'page/Root';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  // Redirect,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { store } from './app/store';

function App() {
  const InnerApp = () => {
    const dispatch = useAppDispatch();
    const account = useAppSelector(selectAccount);
    const [status, setStatus] = useState<PageStatus>('pending');
    // const navigate = useNavigate();

    useEffect(() => {
      if (status === 'load') return;
      const token = localStorage.getItem('browser.token');
      if (account.status === 'logged' || !token) return setStatus('load');
      (async () => {
        const api = await metaApi.getInstance();
        const result = await api.auth.restore({ token }).catch((error) => {
          setStatus('error');
          return;
        });

        dispatch(add({ accountId: result?.id as string, status: 'logged' }));
        setStatus('load');
      })().catch((e) => console.log(e));
    });

    if (status === 'pending') return <Loader />;
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Authentication />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/root"
              element={
                <PrivateRoute>
                  <Root />
                </PrivateRoute>
              }
            />
            <Route
              path="/folder/:folderId"
              element={
                <PrivateRoute>
                  <Browser />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookmark/create/:parentId"
              element={
                <PrivateRoute>
                  <BookmarkCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookmark/:bookmarkId/edit"
              element={
                <PrivateRoute>
                  <BookmarkEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/folder/create/:parentId"
              element={
                <PrivateRoute>
                  <FolderCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/folder/:folderId/edit"
              element={
                <PrivateRoute>
                  <FolderEdit />
                </PrivateRoute>
              }
            />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    );
  };
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}

export default App;
