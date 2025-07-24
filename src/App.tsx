import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AllMovies from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
