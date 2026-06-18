import { Link, Route, Routes } from 'react-router-dom';
import { MainPage } from './screens/MainPage/MainPage';
import { AboutPage } from './screens/AboutPage/AboutPage';
import { NotFoundPage } from './screens/NotFoundPage/NotFoundPage';
import { PokemonDetailsPage } from './screens/PokemonDetailsPage/PokemonDetailsPage';
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
