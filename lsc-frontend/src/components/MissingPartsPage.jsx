import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MissingPartsPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem('collection')) || [];
    // Filter out sets with no missing parts
    const setsWithMissingParts = savedCollection.filter((set) => {
      const missingParts = set.missingParts || {};
      return Object.values(missingParts).some((count) => count > 0);
    });
    setCollection(setsWithMissingParts);
  }, []);

  return (
    <div>
      <h2>Missing Parts</h2>
      {collection.length === 0 ? (
        <p>No sets with missing parts.</p>
      ) : (
        <ul>
          {collection.map((set) => (
            <li key={set.set_num}>
              <h3>{set.name}</h3>
              <ul>
                {Object.entries(set.missingParts).map(([partId, missingCount]) => (
                  <li key={partId}>
                    Part {partId}: {missingCount} missing
                  </li>
                ))}
              </ul>
              <Link to={`/set/${set.set_num}`}>View Set</Link>
              <Link to={`/set/${set.set_num}/parts`}>Back to Check</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MissingPartsPage;
