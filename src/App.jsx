import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryItem from './components/CountryItem';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newFilter, setNewFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  const handleFilter = (e) => {
    setNewFilter(e.target.value);

    const filterData = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredCountries(filterData);
  };

  {
    !countries && null;
  }

  return (
    <>
      <div>
        find countries <input value={newFilter} onChange={handleFilter} />
      </div>
      {filteredCountries && (
        <>
          {filteredCountries.length > 10 ? (
            <div>Too many matches, specify another filter</div>
          ) : filteredCountries.length > 1 ? (
            filteredCountries.map((country) => (
              <div key={country.ccn3}>{country.name.common}</div>
            ))
          ) : (
            filteredCountries.map((country) => (
              <CountryItem key={country.ccn3} country={country} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default App;
