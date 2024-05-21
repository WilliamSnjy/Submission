import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  return (
    <form className="talk-input">
      <input type="text" placeholder="Judul" value={title} onChange={onTitleChange} />
      <input type="text" placeholder="Apa yang kamu pikirkan?" value={body} onChange={onBodyChange} />
      <button type="button" onClick={() => addThread({ title, body })}>Submit</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
