import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLegoSetDetails } from "../services/rebrickable";
import { Container, Typography, Button, Card, CardMedia, CardContent, Box } from "@mui/material";
import GlassyTile from "./GlassyTile";

function SDetails() {
  const { setId } = useParams();
  const [sDetails, setSDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getLegoSetDetails(setId);
        setSDetails(details);
        console.log("Fetched details:", details);
      } catch (error) {
        console.error("Error fetching set details:", error);
      }
    };
    fetchData();
  }, [setId]);

  return (
    <Container sx={{ textAlign: "center", mt: 4, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlassyTile>
        {sDetails ? (
          <>
            <Typography variant="h4" gutterBottom>
              {sDetails.name} ({sDetails.set_num})
            </Typography>
            <GlassyTile sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
              <CardMedia component="img" image={sDetails.set_img_url} alt={sDetails.name} height="300" />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                  <Typography variant="h6">Year: {sDetails.year}</Typography>
                  <Typography variant="h6">Pieces: {sDetails.num_parts}</Typography>
                  <Button variant="contained" color="secondary" href={sDetails.set_url} target="_blank" rel="noopener noreferrer">
                    View on Rebrickable
                  </Button>
                  <Button variant="contained" color="primary" component={Link} to="/collection">
                    Back to Collection
                  </Button>
                </Box>
              </CardContent>
            </GlassyTile>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </GlassyTile>
    </Container>
  );
}

export default SDetails;
