import { asObject, useAnecdoteActions, useAnecdotes } from './store';

const App = () => {
  const anecdotes = useAnecdotes();
  const { vote, add } = useAnecdoteActions();

  const addNote = (e) => {
    e.preventDefault();

    const anecdote = e.target.querySelector('[data-testid="new"]').value;
    add(asObject(anecdote));

    e.target.reset();
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input data-testid='new' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
