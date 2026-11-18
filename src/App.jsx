import AnecdodeForm from './components/AnecdodeForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdodeForm />
    </div>
  );
};

export default App;
