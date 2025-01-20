import { useState, useEffect } from 'react';

function CollectionPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem('collection')) || [];
    setCollection(savedCollection);
  }, []);

  const removeFromCollection = (setId) => {
    const updatedCollection = collection.filter((set) => set.id !== setId);
    localStorage.setItem('collection', JSON.stringify(updatedCollection));
    setCollection(updatedCollection);
  };

  return (
    <div>
      <h2>Your Collection</h2>
      <ul>
        {collection.map((set) => (
          <li key={set.id}>
            {set.name} ({set.year}){' '}
            <button onClick={() => removeFromCollection(set.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionPage;
