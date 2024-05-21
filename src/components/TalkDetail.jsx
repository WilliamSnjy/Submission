import PropTypes from 'prop-types';
import { postedAt } from '../utils';

function ThreadDetail({
  title, body, createdAt, owner,
}) {
  return (
    <section className="talk-detail">
      <header>
        <img src={owner.avatar} alt={owner.name} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{owner.name}</p>
          <p className="talk-detail__user-id">
            @
            {owner.id}
          </p>
        </div>
      </header>
      <article>
        <h1 className="talk-detail__text">{title}</h1>
        <p className="talk-detail__text">{body}</p>
      </article>
      <footer>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
};

export default ThreadDetail;
