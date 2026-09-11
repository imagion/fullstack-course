const FilterList = ({ country, handleShow }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>{country.name.common}</div>
      <button onClick={() => handleShow(country)}>Show</button>
    </div>
  );
};

export default FilterList;
