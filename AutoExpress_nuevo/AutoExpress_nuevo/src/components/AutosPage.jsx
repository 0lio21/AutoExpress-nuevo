import { useLocation } from 'react-router-dom';

const AutosPage = () => {
    const location = useLocation();
    const filters = location.state?.filters; // Accede a los filtros

    // Simulación de lista de autos (deberías obtenerla de un API o archivo)
    const autos = [
        { id: 1, brand: 'Toyota', type: 'SUV' },
        { id: 2, brand: 'Honda', type: 'Sedan' },
        // Más autos...
    ];

    // Filtrar autos
    const filteredAutos = filters
        ? autos.filter(auto => 
            (!filters.brand || auto.brand === filters.brand) && 
            (!filters.type || auto.type === filters.type)
        )
        : autos;

    return (
        <div>
            {filteredAutos.length > 0 ? (
                filteredAutos.map(auto => (
                    <div key={auto.id}>
                        <h3>{auto.brand} - {auto.type}</h3>
                    </div>
                ))
            ) : (
                <p>No se encontraron autos.</p>
            )}
        </div>
    );
};

export default AutosPage;
