import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/TalkDetail';
import ThreadItem from '../components/TalkItem';
import { asyncReceiveThreadDetail, asyncToogleLikeThreadDetail, asyncCreateComment } from '../states/talkDetail/action';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommenstList';

function DetailPage() {
  const { threadId } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onLikeThread = () => {
    dispatch(asyncToogleLikeThreadDetail());
  };

  const onReplyThread = (content) => {
    dispatch(asyncCreateComment({ content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      {
        threadDetail.parent && (
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ThreadItem {...threadDetail.parent} authUser={authUser.id} />
          </div>
        )
      }
      <ThreadDetail {...threadDetail} authUser={authUser.id} likeTalk={onLikeThread} />
      <CommentInput addComment={onReplyThread} />
      <CommentsList comments={threadDetail.comments}/>
    </section>
  );
}

export default DetailPage;
