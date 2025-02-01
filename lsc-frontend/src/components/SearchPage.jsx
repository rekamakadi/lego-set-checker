import { useState } from "react";
import { searchLegoSets } from "../services/rebrickable";
import { Container, Typography, TextField, List, Pagination } from "@mui/material";
import GlassyTile from "./GlassyTile";
import LegoSetListItem from "./LegoSetListItem";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e, newPage = 1) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await searchLegoSets(e.target.value, newPage);
      setSearchResults(response.results);
      setTotalPages(Math.ceil(response.count / 10));
      setPage(newPage);
    }
  };

  const handlePageChange = (event, value) => {
    handleSearch({ target: { value: query } }, value);
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
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2 }}
          />
        )}
      </GlassyTile>
    </Container>
  );
}

export default SearchPage;