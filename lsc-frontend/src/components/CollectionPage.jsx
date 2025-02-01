import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import GlassyTile from "./GlassyTile";

function CollectionPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];
    setCollection(savedCollection);
  }, []);

  const removeFromCollection = (setId) => {
    const updatedCollection = collection.filter((set) => set.set_num !== setId);
    localStorage.setItem("collection", JSON.stringify(updatedCollection));
    setCollection(updatedCollection);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        <Typography variant="h4" gutterBottom>
          Your Collection
        </Typography>
        {collection.length === 0 ? (
          <Typography variant="body1">No sets in your collection.</Typography>
        ) : (
          <List>
            {collection.map((set, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${set.name} (${set.year})`} />
                <Button variant="contained" color="error" onClick={() => removeFromCollection(set.set_num)}>
                  Remove
                </Button>
                <Button variant="outlined" component={Link} to={`/set/${set.set_num}`}>
                  View Details
                </Button>
                <Button variant="outlined" component={Link} to={`/set/${set.set_num}/parts`}>
                  Check Parts
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </GlassyTile>
    </Container>
  );
}

export default CollectionPage;
