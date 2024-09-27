import React, { useState } from 'react';
import '../estilos/FilterAccordion.css';

const FilterAccordion = ({ onFilter }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [filters, setFilters] = useState({
        marca: '',
        año: '',
        sucursal: '',
        tipo: '',
        transmisión: '',
        combustible: ''
    });

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filterOptions = [
        { title: 'Buscar por marca', field: 'marca' },
        { title: 'Buscar por año', field: 'año' },
        { title: 'Buscar por sucursales', field: 'sucursal' },
        { title: 'Buscar por tipo', field: 'tipo' },
        { title: 'Buscar por transmisión', field: 'transmisión' },
        { title: 'Buscar por tipo de combustible', field: 'combustible' }
    ];

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilter(newFilters); // Envía los filtros al componente padre
    };

    return (
        <div className="accordion-container">
            <h2>Continúa tu búsqueda</h2>
            {filterOptions.map((option, index) => (
                <div className="accordion-item" key={index}>
                    <div 
                        className="accordion-title"
                        onClick={() => toggleAccordion(index)}
                    >
                        {option.title}
                        <span className={`accordion-arrow ${activeIndex === index ? 'open' : ''}`}>
                            &#9660;
                        </span>
                    </div>
                    {activeIndex === index && (
                        <div className="accordion-content">
                            <input
                                type="text"
                                placeholder={`Filtrar por ${option.field}`}
                                value={filters[option.field]}
                                onChange={(e) => handleFilterChange(option.field, e.target.value)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilterAccordion;
