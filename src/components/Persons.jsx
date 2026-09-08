import PersonItem from './PersonItem';

const Persons = ({ persons, filterPersons, newFilter, handleDelete }) => {
  return (
    <div>
      {newFilter
        ? filterPersons.map((person) => (
            <PersonItem
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          ))
        : persons.map((person) => (
            <PersonItem
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          ))}
    </div>
  );
};

export default Persons;
