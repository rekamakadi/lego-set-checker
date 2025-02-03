import { Card, CardContent, CardMedia, TextField, Typography, Box } from "@mui/material";

function PartListItem({ part, foundCount, updatePartCount }) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 1, width: "100%", height: "100%", minWidth: 100, maxWidth: 150, m: 1 }}>
      <CardMedia
        component="img"
        image={part.part.part_img_url}
        alt={part.part.name}
        sx={{ width: 80, height: 80, objectFit: "contain" }}
      />
      <CardContent sx={{ textAlign: "center", width: "100%", flexGrow: 1 }}>
        <Typography variant="body1">Part Num: {part.part.part_num}</Typography>
        <Typography variant="body2">Part ID: {part.id}</Typography>
        <Typography variant="body2">Required: {part.quantity}</Typography>
        <Box sx={{ mt: 1, width: "100%" }}>
          <TextField
            type="number"
            value={foundCount}
            onChange={(e) => updatePartCount(part.id, Number(e.target.value), part.quantity)}
            slotProps={{ input: { min: 0, max: part.quantity } }}
            sx={{ width: "50%" }}
            label="Found"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default PartListItem;
