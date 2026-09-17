import { useEffect, useState } from 'react';
import personService from './services/persons';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { Notification, Error } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterPersons, setFilterPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const findDup = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase(),
    );

    if (findDup) {
      const confirmation = window.confirm(
        `${newName} is already in the phonebook, replace the old number with a new one?`,
      );

      if (confirmation) {
        personService
          .update(findDup.id, newPerson)
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id === findDup.id ? res.data : person,
              ),
            );
            setNewName('');
            setNewNumber('');
            setNotification(`Edited ${newPerson.name}`);

            setTimeout(() => {
              setNotification('');
            }, 2000);
          })
          .catch((error) => {
            console.error(error);
            setError(error.response.data.error);
            setTimeout(() => {
              setError('');
            }, 2000);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName('');
          setNewNumber('');
          setNotification(`Added ${newPerson.name}`);

          setTimeout(() => {
            setNotification('');
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          setError(error.response.data.error);
          setTimeout(() => {
            setError('');
          }, 2000);
        });
    }
  };

  const handleFilter = (e) => {
    setNewFilter(e.target.value);

    const filterThings = persons.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterPersons(filterThings);
  };

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((res) => {
          setPersons(persons.filter((person) => person.id !== res.data.id));
          setError(`Deleted ${name}`);
        })
        .catch(() => {
          setError(
            `Information of ${name} has already been removed from server`,
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }

    setTimeout(() => {
      setError(``);
    }, 2000);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />
      <Error error={error} />

      <Filter newFilter={newFilter} handleFilter={handleFilter} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNote={addNote}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterPersons={filterPersons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
