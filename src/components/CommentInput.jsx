import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }){
    const [comment, onCommentChange, setComment] = useInput('');
    const onCommentSubmit = () => {
        addComment(comment);
        setComment('');
      };
    return (
        <form className="talk-reply-input">
            <input type="text" placeholder="Talk your reply" value={comment} onChange={onCommentChange} />
            <p className="talk-reply-input__char-left">
                <strong>{comment.length}</strong>
                /320
            </p>
            <button type="button" onClick={onCommentSubmit}>Reply</button>
        </form>
    );
}

CommentInput.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default CommentInput;