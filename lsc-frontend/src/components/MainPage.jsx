import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import GlassyTile from "./GlassyTile";

function MainPage() {
  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        <Box
          component="img"
          src="/logo.png"
          alt="logo"
          sx={{ width: 100, height: 100, mr: 2, borderRadius: "8px" }}
        />
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
          Less Messness!
        </Button>
      </GlassyTile>
    </Container>
  );
}

export default MainPage;
