import { Box } from "@mui/material";

function GlowEffect({ isComplete, children }) {
  const glowColor = isComplete ? "rgba(0, 255, 0, 0.7)" : "rgba(255, 0, 0, 0.7)";
  
  return (
    <Box
      sx={{
        boxShadow: `0px 0px 10px 4px ${glowColor}`,
        transition: "box-shadow 0.3s ease-in-out",
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default GlowEffect;
