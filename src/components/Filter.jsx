import { useAnecdoteActions, useFilter } from '../store';

const Filter = () => {
  const { filter } = useFilter();
  const { setFilter } = useAnecdoteActions();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter{' '}
      <input
        onChange={handleChange}
        value={filter}
        data-testid='filter'
        placeholder='Search anecdotes'
      />
    </div>
  );
};

export default Filter;
