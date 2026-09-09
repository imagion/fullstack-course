const CountryItem = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.borders.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={Object.values(country.flags)[0]} />
    </>
  );
};

export default CountryItem;
