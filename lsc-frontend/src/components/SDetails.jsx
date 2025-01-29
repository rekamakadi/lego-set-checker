import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLegoSetDetails } from '../services/rebrickable';

function SDetails() {
  const { setId } = useParams();
  const [sDetails, setSDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const details = await getLegoSetDetails(setId);
          setSDetails(details);
          console.log('Fetched details:', details);
        } catch (error) {
          console.error('Error fetching set details:', error);
        }
    };
    fetchData();
  }, [setId]);

  return (
    <div>
      {sDetails ? (
        <>
          <h2>{sDetails.name}</h2>
          <img src={sDetails.set_img_url} alt={sDetails.name} />
          <p>Year: {sDetails.year}</p>
          <p>Pieces: {sDetails.num_parts}</p>
          <Link to="/collection">Back</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SDetails;
