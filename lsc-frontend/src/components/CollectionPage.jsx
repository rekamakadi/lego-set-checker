import { useState, useEffect } from "react";
import { Container, Typography, List } from "@mui/material";
import GlassyTile from "./GlassyTile";
import LegoSetListItem from "./LegoSetListItem";

function CollectionPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];
    setCollection(savedCollection);
  }, []);

  const removeFromCollection = (setId) => {
    const updatedCollection = collection.filter((set) => set.set_num !== setId);
    localStorage.removeItem(`missing-${setId}`);
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
              <LegoSetListItem
                key={index}
                set={set}
                actions={[
                  { text: "Remove", variant: "outlined", color: "error", onClick: () => removeFromCollection(set.set_num) },
                  { text: "View Details", variant: "outlined", link: `/set/${set.set_num}` },
                  { text: "Check Parts", variant: "contained", link: `/set/${set.set_num}/parts` },
                ]}
              />
            ))}
          </List>
        )}
      </GlassyTile>
    </Container>
  );
}

export default CollectionPage;