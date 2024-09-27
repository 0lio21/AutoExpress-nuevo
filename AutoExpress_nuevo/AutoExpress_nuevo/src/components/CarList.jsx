import React, { useRef, useState, useEffect } from 'react';
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

    // Estado para el índice del primer vehículo visible
    const [currentIndex, setCurrentIndex] = useState(0);
    const carsToShow = 4; // Número de vehículos a mostrar

    const totalCars = filteredCars.length;

    // Función para avanzar al siguiente conjunto de vehículos
    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % Math.ceil(totalCars / carsToShow));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, [totalCars]);

    // Calcular los vehículos que se mostrarán en la vista
    const displayedCars = filteredCars.slice(currentIndex * carsToShow, (currentIndex + 1) * carsToShow);

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
                {displayedCars.length > 0 ? (
                    displayedCars.map(car => (
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
