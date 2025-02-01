import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, List, ListItem, ListItemText, Grid, Card, CardContent } from "@mui/material";
import GlassyTile from "./GlassyTile";

function MissingPartsPage() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];
    const setsWithMissingParts = savedCollection.filter((set) => {
      const missingParts = set.missingParts || {};
      return Object.values(missingParts).some((count) => count > 0);
    });
    setCollection(setsWithMissingParts);
  }, []);

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        <Typography variant="h4" gutterBottom>
          Missing Parts
        </Typography>
        {collection.length === 0 ? (
          <Typography variant="body1">No sets with missing parts.</Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {collection.map((set) => (
              <Grid item xs={12} sm={6} md={4} key={set.set_num}>
                <Card sx={{ padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{set.name}</Typography>
                    <List>
                      {Object.entries(set.missingParts).map(([partId, missingCount]) => (
                        <ListItem key={partId}>
                          <ListItemText primary={`Part ${partId}: ${missingCount} missing`} />
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="contained" component={Link} to={`/set/${set.set_num}`} sx={{ mt: 2 }}>
                      View Set
                    </Button>
                    <Button variant="outlined" component={Link} to={`/set/${set.set_num}/parts`} sx={{ mt: 1 }}>
                      Back to Check
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </GlassyTile>
    </Container>
  );
}

export default MissingPartsPage;
