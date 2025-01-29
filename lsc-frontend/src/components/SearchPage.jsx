import { useState } from 'react';
import { searchLegoSets } from '../services/rebrickable';
import { Link } from 'react-router-dom';


function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const results = await searchLegoSets(e.target.value);
      setSearchResults(results);
    }
  };

  const addToCollection = (set) => {
    const collection = JSON.parse(localStorage.getItem('collection')) || [];
    localStorage.setItem('collection', JSON.stringify([...collection, set]));
    alert(`${set.name} added to your collection!`);
  };

  return (
    <div>
      <h2>Search for LEGO Sets</h2>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {searchResults.map((set, index) => (
          <li key={index}>
            {set.name} ({set.year}){' '}
            <button onClick={() => addToCollection(set)}>Add to Collection</button>
            <Link to={`/set/${set.set_num}`}>
              <button>View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
