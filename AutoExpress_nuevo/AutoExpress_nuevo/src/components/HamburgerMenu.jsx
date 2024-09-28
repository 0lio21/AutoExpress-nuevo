import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../estilos/HamburgerMenu.css'; // Asegúrate de que esta ruta sea correcta

const HamburgerMenu = ({ onFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({ brand: '', year: '', sort: '', fuel: '' }); // Estado para los filtros
    const navigate = useNavigate(); // Inicializa useNavigate

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value })); // Actualiza el estado de filtros
    };

    const handleSearch = () => {
        onFilter(filters); // Llama a la función de filtro con los filtros seleccionados
        navigate('/autos', { state: { filters } }); // Redirige a la página de autos, pasando los filtros
    };

    return (
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
            <div
                className="hamburger-icon"
                onClick={toggleMenu}
                role="button"
                aria-expanded={isOpen}
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && toggleMenu()}
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {isOpen && (
                <div className="menu-content">
                    <h2>Filtrar</h2>
                    <div className="filter-group">
                        <label htmlFor="brand">Marca</label>
                        <select name="brand" id="brand" onChange={handleFilterChange}>
                            <option value="">Todas las Marcas</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Ford">Ford</option>
                            <option value="Fiat">Fiat</option>
                            <option value="Toyota">Toyota</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="year">Año</label>
                        <select name="year" id="year" onChange={handleFilterChange}>
                            <option value="">Seleccionar Año</option>
                            {[...Array(66).keys()].map(year => {
                                const y = 2025 - year;
                                return <option key={y} value={y}>{y}</option>;
                            })}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="sort">Ordenar por</label>
                        <select name="sort" id="sort" onChange={handleFilterChange}>
                            <option value="">Seleccionar Orden</option>
                            <option value="asc">Menor a mayor precio</option>
                            <option value="desc">Mayor a menor precio</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="fuel">Tipo de Combustible</label>
                        <select name="fuel" id="fuel" onChange={handleFilterChange}>
                            <option value="">Seleccionar Combustible</option>
                            <option value="gasoline">Gasolina</option>
                            <option value="diesel">Diésel</option>
                            <option value="electric">Eléctrico</option>
                        </select>
                    </div>
                    <button className="btn-search" onClick={handleSearch}>Buscar</button> {/* Botón de búsqueda */}
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
