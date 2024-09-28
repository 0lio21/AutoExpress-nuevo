import Header from './components/Header';
import Inicio from './components/Inicio';
import CarCard from './components/CarCard';
import CarList from './components/CarList'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HamburgerMenu from './components/HamburgerMenu';
import FilteredCarList from './components/FilteredCarList';
import Cotiza from './components/Cotiza';
import Financiamiento from './components/Financiamiento';
import { Navigate } from 'react-router-dom'; // Para manejar rutas no encontradas
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AutosPage from './components/AutosPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/hh" element={<HamburgerMenu />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/autos" element={<CarCard />} /> 
        <Route path="/autos/:brand" element={<CarList />} />
        <Route path="/logos/:brands" element={<FilteredCarList />} />
        <Route path="/cotiza" element={<Cotiza />} />
        <Route path="/financiamiento" element={<Financiamiento />} />
        <Route path="/autoss" component={<AutosPage />} />
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
