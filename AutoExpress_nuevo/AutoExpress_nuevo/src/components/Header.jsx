import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../estilos/Header.css'; 

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const navigate = useNavigate(); 

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Buscando:', searchTerm);
        // Aquí puedes agregar lógica para redirigir a una página de resultados
        // Por ejemplo: navigate(`/busqueda?q=${searchTerm}`);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); 
    }

    const handleQuoteClick = () => {
        navigate('/cotiza'); 
    }

    // Cerrar el menú al hacer clic fuera de él
    const handleClickOutside = (event) => {
        if (isMenuOpen && !event.target.closest('.navbar')) {
            setIsMenuOpen(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="header-container">
            <nav className="navbar">
                <div className="logo">
                    <h1>AutoExpress</h1>
                </div>
                
               
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/autos">Autos</Link></li>
                    <li><Link to="/ofertas">Ofertas Especiales</Link></li>
                    <li><Link to="/financiamiento">Financiamiento</Link></li>
                </ul>
                
                <div className="nav-actions">
                    <button className="btn-quote" onClick={handleQuoteClick}>💬 Cotiza tu auto</button>
                    <button className="btn-login">Iniciar Sesión</button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
