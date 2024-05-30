import PropTypes from 'prop-types';
import CommentItem, {commentShape} from './CommentItem';

function CommentsList ({
    comments,
}){
    return(
        <div className="talks-list">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    {...comment}
                />
            ))}
        </div>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
}

export default CommentsList;