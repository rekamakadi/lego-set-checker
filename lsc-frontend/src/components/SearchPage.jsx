import { useEffect } from "react";
import { searchLegoSets } from "../services/rebrickable";
import {
  Container,
  Typography,
  TextField,
  List,
  Pagination,
} from "@mui/material";
import GlassyTile from "./GlassyTile";
import LegoSetListItem from "./LegoSetListItem";
import { useSearch } from "../context/SearchContext";

function SearchPage() {
  const {
    query,
    setQuery,
    searchResults,
    setSearchResults,
    page,
    setPage,
    totalPages,
    setTotalPages,
  } = useSearch();

  useEffect(() => {
    if (query.length > 2) {
      handleSearch({ target: { value: query } }, page, false);
    }
  }, []);

  const handleSearch = async (e, newPage = 1) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) {
      const response = await searchLegoSets(newQuery, newPage);
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
    if (collection.filter((s) => s.set_num === set.set_num).length > 0) {
      alert(`${set.name} is already in your collection!`);
    } else {
      localStorage.setItem("collection", JSON.stringify([...collection, set]));
      alert(`${set.name} added to your collection!`);
    }
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
                {
                  text: "Add to Collection",
                  color: "primary",
                  onClick: () => addToCollection(set),
                },
                {
                  text: "View Details",
                  variant: "outlined",
                  link: `/set/${set.set_num}`,
                },
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
