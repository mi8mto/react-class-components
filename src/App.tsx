import { Link, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PokemonDetailsPage } from './pages/PokemonDetailsPage/PokemonDetailsPage';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import './App.css';

const App = () => {
  return (
    <>
      <header className="app-header">
        <nav className="app-nav" aria-label="Main navigation">
          <Link to="/?page=1">Home</Link>
          <Link to="/about">About</Link>

          <ThemeToggle />
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details" element={<PokemonDetailsPage />} />
        </Route>

        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
