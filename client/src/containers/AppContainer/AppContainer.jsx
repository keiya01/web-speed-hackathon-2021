import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ja';

dayjs.extend(LocalizedFormat);
dayjs.locale('ja');

const Loading = () => <div style={{ height: '100vh', width: '100%' }}></div>;

const AuthModalContainer = loadable(
  () => import('../AuthModalContainer').then(({ AuthModalContainer }) => ({ default: AuthModalContainer })),
  {
    fallback: <Loading />,
  },
);

const NewPostModalContainer = loadable(
  () => import('../NewPostModalContainer').then(({ NewPostModalContainer }) => ({ default: NewPostModalContainer })),
  {
    fallback: <Loading />,
  },
);

const NotFoundContainer = loadable(
  () => import('../NotFoundContainer').then(({ NotFoundContainer }) => ({ default: NotFoundContainer })),
  {
    fallback: <Loading />,
  },
);

const PostContainer = loadable(
  () => import('../PostContainer').then(({ PostContainer }) => ({ default: PostContainer })),
  {
    fallback: <Loading />,
  },
);

const TermContainer = loadable(
  () => import('../TermContainer').then(({ TermContainer }) => ({ default: TermContainer })),
  {
    fallback: <Loading />,
  },
);

const TimelineContainer = loadable(
  () => import('../TimelineContainer').then(({ TimelineContainer }) => ({ default: TimelineContainer })),
  {
    fallback: <Loading />,
  },
);

const UserProfileContainer = loadable(
  () => import('../UserProfileContainer').then(({ UserProfileContainer }) => ({ default: UserProfileContainer })),
  {
    fallback: <Loading />,
  },
);

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Switch>
          <Route exact path="/">
            <TimelineContainer />
          </Route>
          <Route exact path="/users/:username">
            <UserProfileContainer />
          </Route>
          <Route exact path="/posts/:postId">
            <PostContainer />
          </Route>
          <Route exact path="/terms">
            <TermContainer />
          </Route>
          <Route path="*">
            <NotFoundContainer />
          </Route>
        </Switch>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
