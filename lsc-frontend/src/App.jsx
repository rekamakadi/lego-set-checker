import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';
import CollectionPage from './components/CollectionPage';
import SDetails from './components/SDetails';
import MissingPartsPage from './components/MissingPartsPage';
import SetParts from './components/SetParts';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/set/:setId" element={<SDetails />} />
        <Route path="/missing-parts" element={<MissingPartsPage />} />
        <Route path="/set/:setId/parts" element={<SetParts />} />
      </Routes>
    </Router>
  );
}

export default App;
