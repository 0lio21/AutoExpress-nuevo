import React, { useRef } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener la marca de la URL
import data from '../data/carsData.json';
import '../estilos/CarList.css';

const CarList = () => {
    const scrollContainerRef = useRef(null);
    const { brand } = useParams(); // Obtener la marca desde la URL

    // Filtrar los autos basados en la marca seleccionada
    const filteredCars = data.filter(car => {
        return brand ? car.make.toLowerCase() === brand.toLowerCase() : true;
    });

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    };

    return (
        <div className="car-slider">
            <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
            <div className="car-list" ref={scrollContainerRef}>
                {filteredCars.length > 0 ? (
                    filteredCars.map(car => (
                        <div className="car-card" key={car.id}>
                            <img src={car.image} alt={`${car.make} ${car.model}`} />
                            <h2>{car.make} {car.model}</h2>
                            <p>Año: {car.year}</p>
                            <p>Precio: ${car.price}</p>
                            <button className="btn-details">Ver más detalles</button>
                        </div>
                    ))
                ) : (
                    <p>No hay vehículos disponibles para esta marca.</p>
                )}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
        </div>
    );
};

export default CarList;
