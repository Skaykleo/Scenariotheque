import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page.jsx";
import BrowsePage from "./pages/browse.page.jsx";
import ProfilePage from "./pages/profile.page.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parcourir" element={<BrowsePage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;