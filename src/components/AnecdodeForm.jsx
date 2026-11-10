import { asObject, useAnecdoteActions } from '../store';

const AnecdodeForm = () => {
  const { add } = useAnecdoteActions();

  const addNote = (e) => {
    e.preventDefault();

    const anecdote = e.target.querySelector('[data-testid="new"]').value;
    add(asObject(anecdote));

    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input data-testid='new' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdodeForm;
