import { useState, useEffect } from "react";
import { Container, Typography, List, Button, Box } from "@mui/material";
import GlassyTile from "./GlassyTile";
import LegoSetListItem from "./LegoSetListItem";
import GlowEffect from "./GlowEffect";

function CollectionPage() {
  const [collection, setCollection] = useState([]);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);

  useEffect(() => {
    const savedCollection =
      JSON.parse(localStorage.getItem("collection")) || [];
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
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowIncompleteOnly((prev) => !prev)}
          sx={{ mb: 2 }}
        >
          {showIncompleteOnly ? "Show All" : "Show Incomplete"}
        </Button>
        {collection.length === 0 ? (
          <Typography variant="body1">No sets in your collection.</Typography>
        ) : (
          <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {" "}
            {collection
              .filter(
                (set) =>
                  !showIncompleteOnly ||
                  Object.keys(set.missingParts || {}).length > 0
              )
              .map((set, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <GlowEffect
                    key={index}
                    isComplete={!Object.keys(set.missingParts || {}).length}
                  >
                    <LegoSetListItem
                      key={index}
                      set={set}
                      actions={[
                        {
                          text: "Remove",
                          variant: "outlined",
                          color: "error",
                          onClick: () => removeFromCollection(set.set_num),
                        },
                        {
                          text: "View Details",
                          variant: "outlined",
                          link: `/set/${set.set_num}`,
                        },
                        {
                          text: "Check Parts",
                          variant: "contained",
                          link: `/set/${set.set_num}/parts`,
                        },
                      ]}
                    />
                  </GlowEffect>
                </Box>
              ))}
          </List>
        )}
      </GlassyTile>
    </Container>
  );
}

export default CollectionPage;
