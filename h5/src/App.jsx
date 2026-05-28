import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import GamePage from './pages/GamePage';
import MuseumPage from './pages/MuseumPage';
import './styles/global.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/museum" element={<MuseumPage />} />
      </Routes>
    </HashRouter>
  );
}
