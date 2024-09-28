import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener la marca de la URL
import data from '../data/carsData.json'; // Datos de autos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/CarList.css'; // Archivo de estilos personalizado

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
    <div className="container">
      <div className="car-slider row">
        <button className="scroll-button btn btn-secondary col-1" onClick={scrollLeft}>{"<"}</button>
        <div className="car-list col-10" ref={scrollContainerRef}>
          <div className="row">
            {displayedCars.length > 0 ? (
              displayedCars.map(car => (
                <div className="car-card card col-md-3 mx-1" key={car.id}>
                  <img src={car.image} alt={`${car.make} ${car.model}`} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{car.make} {car.model}</h5>
                    <p className="card-text">Año: {car.year}</p>
                    <p className="card-text">Precio: ${car.price}</p>
                    <button className="btn btn-primary">Ver más detalles</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No hay vehículos disponibles para esta marca.</p>
            )}
          </div>
        </div>
        <button className="scroll-button btn btn-secondary col-1" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
};

export default CarList;
