import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncToogleLikeThread } from '../states/talks/action';
import ThreadInput from '../components/TalkInput';
import ThreadsList from '../components/TalksList';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = (title, body) => {
    dispatch(asyncAddThread({ title, body }));
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLike = (id) => {
    dispatch(asyncToogleLikeThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    threadOwner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <ThreadInput addThread={onAddThread} />
      <ThreadsList threads={threadList} like={onLike} />
    </section>
  );
}

export default HomePage;
