import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, body, createdAt, threadOwner, authUser,
}) {
  const navigate = useNavigate();

  const onTalkClick = () => {
    navigate(`/threads/${id}`);
  };

  const onTalkPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div role="button" tabIndex={0} className="talk-item" onClick={onTalkClick} onKeyDown={onTalkPress}>
      <div className="talk-item__user-photo">
        <img src={threadOwner.avatar} alt={threadOwner.name} />
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{threadOwner.name}</p>
            <p className="talk-item__user-id">
              @
              {threadOwner.id}
            </p>
          </div>
          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="talk-item__text">{title}</p>
          <p className="talk-item__text">{body}</p>
        </article>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  threadOwner: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string.isRequired,
};

export { threadItemShape };

export default ThreadItem;
