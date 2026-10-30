
import './index.css';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import AnimeList from './components/AnimeList';
import AnimeDetails from './components/AnimeDetails';
import Favorites from './components/Favorites';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<AnimeList />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
