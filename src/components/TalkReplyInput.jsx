import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ThreadReplyInput({ replyThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate('/');

  function replyThreadHandler() {
    if (body.trim()) {
      replyThread( title, body );
      setBody('');
      navigate('/');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setTitle(target.value);
      setBody(target.value);
    }
  }

  return (
    <form className="talk-reply-input">
      <input type="text" placeholder="Talk your reply" value={title} onChange={handleTextChange} />
      <input type="text" placeholder="Talk your reply" value={body} onChange={handleTextChange} />
      <p className="talk-reply-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <button type="button" onClick={replyThreadHandler}>Reply</button>
    </form>
  );
}

ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
