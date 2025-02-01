import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLegoSetDetails } from "../services/rebrickable";
import { Container, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
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
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        {sDetails ? (
          <>
            <Typography variant="h4" gutterBottom>
              {sDetails.name}
            </Typography>
            <Card sx={{ maxWidth: 500, margin: "auto" }}>
              <CardMedia component="img" image={sDetails.set_img_url} alt={sDetails.name} height="300" />
              <CardContent>
                <Typography variant="h6">Year: {sDetails.year}</Typography>
                <Typography variant="h6">Pieces: {sDetails.num_parts}</Typography>
                <Button variant="contained" color="primary" component={Link} to="/collection" sx={{ mt: 2 }}>
                  Back to Collection
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </GlassyTile>
    </Container>
  );
}

export default SDetails;
