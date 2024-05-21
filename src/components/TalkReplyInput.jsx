import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ThreadReplyInput({ replyThread }) {
  const [body, setBody] = useState('');
  const navigate = useNavigate('/');

  function replyThreadHandler() {
    if (body.trim()) {
      replyThread(body);
      setBody('');
      navigate('/');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }

  return (
    <div className="talk-reply-input">
      <textarea type="text" placeholder="Talk your reply" value={body} onChange={handleTextChange} />
      <p className="talk-reply-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <button type="submit" onClick={replyThreadHandler}>Reply</button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
