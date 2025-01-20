import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLegoSetDetails, getLegoSetParts } from '../services/rebrickable';

function SetDetails() {
  const { setId } = useParams();
  const [setDetails, setSetDetails] = useState(null);
  const [parts, setParts] = useState([]);
  const [missingParts, setMissingParts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const details = await getLegoSetDetails(setId);
      const partsList = await getLegoSetParts(setId);
      setSetDetails(details);
      setParts(partsList);
      const savedMissing = JSON.parse(localStorage.getItem(`missing-${setId}`)) || [];
      setMissingParts(savedMissing);
    };
    fetchData();
  }, [setId]);

  const toggleMissing = (partId) => {
    const updatedMissing = missingParts.includes(partId)
      ? missingParts.filter((id) => id !== partId)
      : [...missingParts, partId];
    setMissingParts(updatedMissing);
    localStorage.setItem(`missing-${setId}`, JSON.stringify(updatedMissing));
  };

  return (
    <div>
      {setDetails ? (
        <>
          <h2>{setDetails.name}</h2>
          <img src={setDetails.set_img_url} alt={setDetails.name} />
          <h3>Parts List</h3>
          <ul>
            {parts.map((part) => (
              <li key={part.id}>
                <input
                  type="checkbox"
                  checked={!missingParts.includes(part.id)}
                  onChange={() => toggleMissing(part.id)}
                />
                <img src={part.part.part_img_url} alt={part.part.name} width="50" />
                {part.part.name} (x{part.quantity})
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SetDetails;
