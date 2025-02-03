import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";
import CollectionPage from "./components/CollectionPage";
import SDetails from "./components/SDetails";
import SetParts from "./components/SetParts";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <Router>
      <Navbar />
      <SearchProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/set/:setId" element={<SDetails />} />
          <Route path="/set/:setId/parts" element={<SetParts />} />
        </Routes>{" "}
      </SearchProvider>
    </Router>
  );
}

export default App;
