import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLegoSetParts } from "../services/rebrickable";
import { Container, Typography, Button, Card, CardContent, CardMedia, TextField, Grid } from "@mui/material";
import GlassyTile from "./GlassyTile";

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
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        <Typography variant="h4" gutterBottom>
          Check Parts
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {parts.map((part) => (
            <Grid item xs={12} sm={6} md={4} key={part.id}>
              <Card sx={{ padding: 2 }}>
                <CardMedia component="img" image={part.part.part_img_url} alt={part.part.name} height="100" />
                <CardContent>
                  <Typography variant="body1">{part.part.name} (x{part.quantity})</Typography>
                  <TextField
                    type="number"
                    value={foundParts[part.id] || 0}
                    onChange={(e) => updatePartCount(part.id, Number(e.target.value), part.quantity)}
                    inputProps={{ min: 0, max: part.quantity }}
                    sx={{ width: "100%", mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" color="primary" onClick={saveProgress} sx={{ mt: 3 }}>
          Save Progress
        </Button>
        <Button variant="outlined" component={Link} to="/collection" sx={{ mt: 2 }}>
          Back to Collection
        </Button>
      </GlassyTile>
    </Container>
  );
}

export default SetParts;
