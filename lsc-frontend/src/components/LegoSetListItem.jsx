import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function LegoSetListItem({ set, actions }) {
  return (
    <ListItem
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={set.set_img_url}
            alt={set.name}
            variant="square"
            sx={{ width: 56, height: 56 }}
          />
        </ListItemAvatar>
        <Box sx={{ flexGrow: 1, textAlign: "left", minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {set.name} ({set.set_num})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Year: {set.year}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {actions.map((action, index) =>
          action.link ? (
            <Button
              key={index}
              variant={action.variant || "contained"}
              component={Link}
              to={action.link}
              color={action.color || "primary"}
              sx={{ flex: "1 1 120px", minWidth: "120px" }}
            >
              {action.text}
            </Button>
          ) : (
            <Button
              key={index}
              variant={action.variant || "contained"}
              onClick={action.onClick}
              color={action.color || "primary"}
              sx={{ flex: "1 1 120px", minWidth: "120px" }}
            >
              {action.text}
            </Button>
          )
        )}
      </Box>
    </ListItem>
  );
}

export default LegoSetListItem;
