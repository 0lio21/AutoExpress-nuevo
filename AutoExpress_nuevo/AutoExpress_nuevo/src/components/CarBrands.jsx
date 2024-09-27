import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/CarBrands.css';
import CarList from './CarList';

// Importa los logos de manera explícita
import chevroletLogo from '../assets/images/chevrolet_logo.png';
import fiatLogo from '../assets/images/fiat_logo.png';
import peugeotLogo from '../assets/images/peugeot_logo.png';
import renaultLogo from '../assets/images/renault_logo.png';
import toyotaLogo from '../assets/images/toyota_logo.png';
import fordLogo from '../assets/images/ford_logo.png';
import hondaLogo from '../assets/images/honda_logo.png';
import volkswagenLogo from '../assets/images/volkswagen_logo.png';

const CarBrands = () => {
    const navigate = useNavigate();

    // Función para manejar el clic en un logo
    const handleBrandClick = (brand) => {
        // Redirige a la página con los autos filtrados por marca
        navigate(`/autos/${brand.toLowerCase()}`); // Asegúrate de usar comillas invertidas para la plantilla
    };

    // Lista de marcas con su logo y nombre
    const brands = [
        { name: 'Chevrolet', logo: chevroletLogo },
        { name: 'Fiat', logo: fiatLogo },
        { name: 'Peugeot', logo: peugeotLogo },
        { name: 'Renault', logo: renaultLogo },
        { name: 'Toyota', logo: toyotaLogo },
        { name: 'Ford', logo: fordLogo },
        { name: 'Honda', logo: hondaLogo },
        { name: 'Volkswagen', logo: volkswagenLogo },
    ];

    return (
        <div className="brand-slider-section">
            <div className="brand-container">
                {brands.map(brand => (
                    <div className="brand-card" key={brand.name} onClick={() => handleBrandClick(brand.name)}>
                        <img src={brand.logo} alt={brand.name} />
                        <p>{brand.name}</p>
                    </div>
                ))}
            </div>
        </div>
        
        
    );
    
};

export default CarBrands;
