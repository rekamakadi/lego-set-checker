function MissingPartsPage() {
    const [missingParts, setMissingParts] = useState([]);
  
    useEffect(() => {
      const keys = Object.keys(localStorage).filter((key) => key.startsWith('missing-'));
      const parts = keys.flatMap((key) => JSON.parse(localStorage.getItem(key)));
      setMissingParts(parts);
    }, []);
  
    return (
      <div>
        <h2>Missing Parts</h2>
        <ul>
          {missingParts.map((partId, index) => (
            <li key={index}>Part ID: {partId}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default MissingPartsPage;
  