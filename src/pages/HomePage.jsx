import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncToogleLikeThread } from '../states/talks/action';
import { asyncCreateComment } from '../states/talkDetail/action';
import ThreadInput from '../components/TalkInput';
import ThreadsList from '../components/TalksList';


function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
    comments,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body }) => {
    dispatch(asyncAddThread({ title, body }));
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLike = (id) => {
    dispatch(asyncToogleLikeThread(id));
  };

  const onComment = (threadId, content) => {
    dispatch(asyncCreateComment({ threadId, content }));
  };

  const threadList = threads.map((thread) => {
    const commentCount = comments ? comments.filter((comment) => comment.threadId === thread.id).length : 0;
    return {
      ...thread,
      threadOwner: users.find((user) => user.id === thread.ownerId),
      authUser: authUser.id,
      commentCount,
    };
  });

  return (
    <section className="home-page">
      <ThreadInput addThread={onAddThread} />
      <ThreadsList threads={threadList} like={onLike} comment={onComment}/>
    </section>
  );
}

export default HomePage;
