import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CollectionPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem('collection')) || [];
    setCollection(savedCollection);
  }, []);

  const removeFromCollection = (setId) => {
    const updatedCollection = collection.filter((set) => set.set_num !== setId);
    localStorage.setItem('collection', JSON.stringify(updatedCollection));
    setCollection(updatedCollection);
  };

  return (
    <div>
      <h2>Your Collection</h2>
      <ul>
        {collection.map((set, index) => (
          <li key={index}>
            {set.name} ({set.year}){' '}
            <button onClick={() => removeFromCollection(set.set_num)}>Remove</button>
            <Link to={`/set/${set.set_num}`}><button>View Details</button></Link>
            <Link to={`/set/${set.set_num}/parts`}><button>Check Parts</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionPage;
