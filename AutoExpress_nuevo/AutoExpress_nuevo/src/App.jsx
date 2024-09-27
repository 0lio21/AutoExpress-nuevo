import Header from './components/Header';
import Inicio from './components/inicio';
import CarCard from './components/CarCard';
import CarList from './components/CarList'; // Asegúrate de importar el componente correctamente
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HamburgerMenu from './components/HamburgerMenu';
import FilteredCarList from './components/FilteredCarList';
import Cotiza from './components/Cotiza';
import Financiamiento from './components/Financiamiento';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/hh" element={<HamburgerMenu />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/autos" element={<CarCard />} /> {/* Componente cerrado correctamente */}
        <Route path="/autos/:brand" element={<CarList />} />
        <Route path="/logos/:brands" element={<FilteredCarList />} />
        <Route path="/cotiza" element={<Cotiza />} />
        <Route path="/financiamiento" element={<Financiamiento />} />
      </Routes>
    </Router>
  );
}

export default App;
