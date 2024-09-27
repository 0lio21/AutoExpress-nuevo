import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../estilos/Header.css'; // Ruta ajustada al archivo CSS

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const handleSearch = (event) => {
        event.preventDefault();
        console.log('Buscando:', searchTerm);
        // Aquí puedes agregar lógica para redirigir a una página de resultados
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Alternar la visibilidad del menú
    }

    const handleQuoteClick = () => {
        navigate('/cotiza'); // Redirige a la página de cotización
    }

    return (
        <header className="header-container">
            <nav className="navbar">
                <div className="logo">
                    <h1>Concesionario</h1>
                </div>
                {/* Botón de hamburguesa */}
                <div className="hamburger-icon" onClick={toggleMenu}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                {/* Menú de navegación */}
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/autos">Autos</Link></li>
                    <li><Link to="/ofertas">Ofertas Especiales</Link></li>
                    <li><Link to="/financiamiento">Financiamiento</Link></li>
                </ul>
                <form onSubmit={handleSearch} className="search-form">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button type="submit">Buscar</button>
                </form>
                <div className="nav-actions">
                    <button className="btn-quote" onClick={handleQuoteClick}>💬 Cotiza tu auto</button> {/* Llama a la función al hacer clic */}
                    <button className="btn-login">Iniciar Sesión</button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
