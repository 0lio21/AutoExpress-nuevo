import React, { useState } from 'react';
import CarList from './CarList';
import NewsCarousel from './NewsCarousel';
import FilterAccordion from './FilterAccordion';
import HeroSection from './HeroSection';
import CarBrands from './CarBrands';
import HamburgerMenu from './HamburgerMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/inicio.css';

const Inicio = () => {
  const [filters, setFilters] = useState({});

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <main className="container my-5">
      <HamburgerMenu onFilter={handleFilter} />
      <CarBrands />
      <h1 className="text-center my-4">Lista de Autos</h1>
      <CarList filters={filters} />
      <HeroSection />
      <h1 className="text-center my-4">Noticias Recientes</h1>
      <NewsCarousel />
      <FilterAccordion onFilter={handleFilter} />
      <footer className="footer-container bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>Concesionario</h3>
              <p>© 2024 Concesionario. Todos los derechos reservados.</p>
              <p>Desarrollado por AutoExpress</p>
            </div>
            <div className="col-md-4">
              <h3>Redes Sociales</h3>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light"><i className="fab fa-facebook-f"></i> Facebook</a></li>
                <li><a href="#" className="text-light"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#" className="text-light"><i className="fab fa-instagram"></i> Instagram</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Contacto</h3>
              <p>📞 +123 456 7890</p>
              <p>📧 info@concesionario.com</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Inicio;
