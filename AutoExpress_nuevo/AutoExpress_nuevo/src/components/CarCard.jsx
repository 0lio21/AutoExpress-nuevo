import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL
import Header from './Header'; // Componente de encabezado
import carsData from '../data/carsData'; // Asegúrate de tener los datos JSON cargados
import "../estilos/CarCard.css";

const CarCard = () => {
  const { brand } = useParams(); // Obtiene la marca de la URL
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [filters, setFilters] = useState({
    year: '',
    sort: ''
  });

  // Función para manejar los filtros
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  // Función para filtrar y ordenar los autos
  useEffect(() => {
    let cars = carsData;

    // Filtrar por marca obtenida de la URL
    if (brand) {
      cars = cars.filter(car => car.make.toLowerCase() === brand.toLowerCase());
    }

    // Filtrar por año
    if (filters.year) {
      cars = cars.filter(car => car.year === parseInt(filters.year));
    }

    // Ordenar por precio
    if (filters.sort === 'asc') {
      cars = cars.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'desc') {
      cars = cars.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(cars);
  }, [brand, filters]);

  return (
    <>
      
      <div className="car-list-container">
        <div className="filters">
          <h2>Filtrar</h2>
          <div className="filter-group">
            <label htmlFor="year">Año</label>
            <select name="year" id="year" onChange={handleFilterChange}>
              <option value="">Seleccionar Año</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Ordenar por</label>
            <select name="sort" id="sort" onChange={handleFilterChange}>
              <option value="">Seleccionar Orden</option>
              <option value="asc">Más barato a más caro</option>
              <option value="desc">Más caro a más barato</option>
            </select>
          </div>
        </div>

        <div className="car-list">
          <h2>Listado de Autos de {brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'desconocida'}</h2>
          <div className="cars">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <img src={`/images/${car.image}`} alt={car.model} />
                <h3>{car.make} {car.model}</h3>
                <p>Precio: ${car.price.toLocaleString()}</p>
                <p>Año: {car.year}</p>
                <button>Ver más</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarCard;
