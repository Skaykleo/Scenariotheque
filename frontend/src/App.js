import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import HomePage from './pages/home.page.jsx';
import BrowsePage from './pages/browse.page.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/parcourir"  element={<BrowsePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
