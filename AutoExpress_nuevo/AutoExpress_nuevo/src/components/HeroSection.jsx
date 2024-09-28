import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../estilos/HeroSection.css';
import carImage from '../images/car-vehicles-transport-in-flat-style-png.webp';

const HeroSection = () => {
    const navigate = useNavigate(); // Hook para la navegación

    const handleClick = () => {
        navigate('/cotiza'); // Redirige a la página Cotiza.jsx
    };

    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Cambiá o vendé tu auto de forma simple y rápida</h1>
                <p>Cotizá tu auto y agendá una inspección en nuestra sede más cercana.</p>
                <hr />
                <p>Vendé tu auto sin intermediarios. Te depositamos directo en tu cuenta.</p>
                <hr />
                <p>Dejalo en parte de pago y llevate un auto certificado y con garantía.</p>
                <button className="cta-button" onClick={handleClick}>
                    Vendé tu auto
                </button>
            </div>
            <div className="hero-image">
                <img src={carImage} alt="Coche" />
            </div>
        </div>
    );
};

export default HeroSection;

