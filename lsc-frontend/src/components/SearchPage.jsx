import { useState } from "react";
import { searchLegoSets } from "../services/rebrickable";
import { Container, Typography, TextField, List } from "@mui/material";
import GlassyTile from "./GlassyTile";
import LegoSetListItem from "./LegoSetListItem";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const results = await searchLegoSets(e.target.value);
      setSearchResults(results);
    }
  };

  const addToCollection = (set) => {
    const collection = JSON.parse(localStorage.getItem("collection")) || [];
    localStorage.setItem("collection", JSON.stringify([...collection, set]));
    alert(`${set.name} added to your collection!`);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <GlassyTile>
        <Typography variant="h4" gutterBottom>
          Search for LEGO Sets
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          sx={{ mb: 2 }}
        />
        <List>
          {searchResults.map((set, index) => (
            <LegoSetListItem
              key={index}
              set={set}
              actions={[
                { text: "Add to Collection", color: "primary", onClick: () => addToCollection(set) },
                { text: "View Details", variant: "outlined", link: `/set/${set.set_num}` },
              ]}
            />
          ))}
        </List>
      </GlassyTile>
    </Container>
  );
}

export default SearchPage;