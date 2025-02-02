import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLegoSetParts } from "../services/rebrickable";
import { Container, Typography, Button, Grid2 } from "@mui/material";
import GlassyTile from "./GlassyTile";
import LegoSetListItem from "./LegoSetListItem";
import PartListItem from "./PartListItem";

function SetParts() {
  const { setId } = useParams();
  const [parts, setParts] = useState([]);
  const [currentSet, setCurrentSet] = useState(null);
  const [foundParts, setFoundParts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const partsList = await getLegoSetParts(setId);
      setParts(partsList);
      const collection = JSON.parse(localStorage.getItem("collection")) || [];
      const setToCheck = collection.find((set) => set.set_num === setId);
      setCurrentSet(setToCheck);
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

    const collection = JSON.parse(localStorage.getItem("collection")) || [];
    const updatedCollection = collection.map((set) => {
      if (set.set_num === setId) {
        return {
          ...set,
          missingParts: missingParts,
        };
      }
      return set;
    });

    localStorage.setItem("collection", JSON.stringify(updatedCollection));
    localStorage.setItem(`missing-${setId}`, JSON.stringify(foundParts));
    alert("Progress saved!");
  };

  return (
    <Container sx={{ textAlign: "center", mt: 4, maxWidth: "lg" }}>
      <GlassyTile>
        <Typography variant="h4" gutterBottom>
          Check Parts for
        </Typography>
        {currentSet && <LegoSetListItem set={currentSet} actions={[]} />}
        <Grid2 container spacing={2} justifyContent="center" alignItems="stretch">
          {parts.map((part) => (
            <Grid2 item key={part.id} xs={6} sm={4} md={3} lg={2} sx={{ my: 2, display: "flex", justifyContent: "center" }}>
              <PartListItem
                part={part}
                foundCount={foundParts[part.id] || 0}
                updatePartCount={updatePartCount}
              />
            </Grid2>
          ))}
        </Grid2>
        <Button variant="contained" color="primary" onClick={saveProgress} sx={{ mt: 4 }}>
          Save Progress
        </Button>
        <Button variant="outlined" component={Link} to="/collection" sx={{ mt: 4 }}>
          Back to Collection
        </Button>
      </GlassyTile>
    </Container>
  );
}

export default SetParts;