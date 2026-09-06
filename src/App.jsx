import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilter} />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterPersons, newFilter }) => {
  return (
    <div>
      {newFilter
        ? filterPersons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))
        : persons.map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPersons, setFilterPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const findDup = persons.find((person) => person.name === newName);

    if (findDup) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleFilter = (e) => {
    setNewFilter(e.target.value);

    const filterThings = persons.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterPersons(filterThings);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilter={handleFilter} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterPersons={filterPersons}
        newFilter={newFilter}
      />
    </div>
  );
};

export default App;
