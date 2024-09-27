import React, { useState } from 'react';
import CarList from './CarList';
import NewsCarousel from './NewsCarousel';
import FilterAccordion from './FilterAccordion';
import HeroSection from './HeroSection';
import CarBrands from './CarBrands';
import '../estilos/inicio.css'

const Inicio = () => {
    const [filters, setFilters] = useState({});

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="App">
            <main>
            <h1>Marcas</h1>
        {/* Mostrar las marcas */}
        <CarBrands />
                {/* Barra de búsqueda */}
                <h1>Lista de Autos</h1>
                {/* Filtros */}
                
                <CarList filters={filters} />
                {/* Sección Hero */}
                <HeroSection />
                {/* Carrusel de noticias */}
                <h1>Noticias Recientes</h1>
                <NewsCarousel />
                <FilterAccordion onFilter={handleFilter} />
                {/* Lista de autos filtrados */}
            </main>

            <footer className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Concesionario</h3>
                        <p>© 2024 Concesionario. Todos los derechos reservados.</p>
                        <p>Desarrollado por AutoExpress</p>
                    </div>
                    <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
/>

                    <div className="footer-section">
                        <h3>Redes Sociales</h3>
                        <ul className="social-links">
                            <li><a href="#"><i className="fab fa-facebook-f"></i> Facebook</a></li>
                            <br></br>
                            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                            <br></br>
                            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contacto</h3>
                        <p>📞 +123 456 7890</p>
                        <p>📧 info@concesionario.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Inicio;
