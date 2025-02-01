import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import GlassyTile from "./GlassyTile"; // Import the GlassyTile component

function MainPage() {
  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        <Typography variant="h3" gutterBottom>
          Welcome to LEGO Set Checker
        </Typography>
        <Typography variant="h5" gutterBottom>
          Check your LEGO sets and track missing parts!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/search"
          sx={{ mt: 3 }}
        >
          Let's Start
        </Button>
      </GlassyTile>
    </Container>
  );
}

export default MainPage;
