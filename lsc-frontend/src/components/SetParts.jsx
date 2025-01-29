import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLegoSetParts } from '../services/rebrickable';

function SetParts() {
  const { setId } = useParams();
  const [parts, setParts] = useState([]);
  const [foundParts, setFoundParts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const partsList = await getLegoSetParts(setId);
      setParts(partsList);

      const savedData = JSON.parse(localStorage.getItem(`missing-${setId}`)) || {};
      setFoundParts(savedData);
    };
    fetchData();
  }, [setId]);

  const updatePartCount = (partId, count, max) => {
    const newCount = Math.min(max, Math.max(0, count));
    setFoundParts((prev) => ({ ...prev, [partId]: newCount }));
  };

  const saveProgress = () => {
    const missingParts = {};
    parts.forEach((part) => {
      const foundCount = foundParts[part.id] || 0;
      const missingCount = part.quantity - foundCount;
      if (missingCount > 0) {
        missingParts[part.id] = missingCount;
      }
    });

    // Get the collection from localStorage
    const collection = JSON.parse(localStorage.getItem('collection')) || [];

    // Update the collection with the missing parts data
    const updatedCollection = collection.map((set) => {
      if (set.set_num === setId) {
        return {
          ...set,
          missingParts: missingParts,
        };
      }
      return set;
    });

    localStorage.setItem('collection', JSON.stringify(updatedCollection));

    localStorage.setItem(`missing-${setId}`, JSON.stringify(foundParts));

    alert('Progress saved!');
  };

  return (
    <div>
      <h2>Check Parts</h2>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            <img src={part.part.part_img_url} alt={part.part.name} width="50" />
            {part.part.name} (x{part.quantity}) 
            <input
              type="number"
              value={foundParts[part.id] || 0}
              onChange={(e) => updatePartCount(part.id, Number(e.target.value), part.quantity)}
              min="0"
              max={part.quantity}
            />
          </li>
        ))}
      </ul>
      <button onClick={saveProgress}>Save</button>
      <Link to={`/collection`}>Back</Link>
    </div>
  );
}

export default SetParts;
