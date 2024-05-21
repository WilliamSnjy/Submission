import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/TalkDetail';
import ThreadItem from '../components/TalkItem';
import ThreadReplyInput from '../components/TalkReplyInput';
import { asyncReceiveThreadDetail, asyncToogleLikeThreadDetail } from '../states/talkDetail/action';
import { asyncAddThread } from '../states/talks/action';

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

  const onReplyThread = (body) => {
    dispatch(asyncAddThread({ body, replyTo: threadId }));
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
      <ThreadReplyInput replyTalk={onReplyThread} />
    </section>
  );
}

export default DetailPage;
