import { Box } from "@mui/material";

function GlassyTile({ children }) {
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.4)", // Semi-transparent background
        backdropFilter: "blur(10px)", // Glass effect
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        maxWidth: "600px", // Optional: Restrict width
        margin: "auto", // Centering
      }}
    >
      {children}
    </Box>
  );
}

export default GlassyTile;
