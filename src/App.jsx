import AnecdodeForm from './components/AnecdodeForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdodeForm />
    </div>
  );
};

export default App;
