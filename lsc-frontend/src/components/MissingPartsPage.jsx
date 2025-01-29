import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MissingPartsPage() {
  const [missingParts, setMissingParts] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith('missing-'));
    const parts = keys.flatMap((key) => {
      const setId = key.replace('missing-', '');
      const storedParts = JSON.parse(localStorage.getItem(key)) || {};
      return Object.entries(storedParts).map(([partId, foundCount]) => {
        const part = JSON.parse(localStorage.getItem(`part-${partId}`)); // Fetch part data
        const missingCount = part ? Math.max(0, part.quantity - foundCount) : 0;
        return {
          setId,
          partId,
          partName: part ? part.name : "Unknown Part",
          missingCount,
        };
      });
    });

    setMissingParts(parts);
  }, []);

  return (
    <div>
      <h2>Missing Parts</h2>
      <ul>
        {missingParts.map((part, index) => (
          <li key={index}>
            {part.partName} - Missing: {part.missingCount} 
            <Link to={`/set/${part.setId}/parts`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MissingPartsPage;
