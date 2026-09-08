const PersonItem = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.name, person.id)}>
        delete
      </button>
    </div>
  );
};

export default PersonItem;
