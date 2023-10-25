import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/mainPage';
import MovieDetailsPage from './pages/movieDetailsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie-details" element={<MovieDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
