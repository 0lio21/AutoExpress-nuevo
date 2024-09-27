import React, { useEffect, useState } from 'react';
import ConsultaDeudor from './ConsultaDeudor'; // Importa el nuevo componente
import Calculator from './Calculator'; 
import FAQ from './FAQ'; 
import '../estilos/Financiamiento.css'; 

const Financiamiento = () => {
    const [financiamientoOptions, setFinanciamientoOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFinanciamientoOptions = async () => {
            try {
                const response = await fetch('URL_DE_TU_API'); // Cambia esto por la URL de tu API
                if (!response.ok) {
                    throw new Error('Error al cargar opciones de financiamiento');
                }
                const data = await response.json();
                setFinanciamientoOptions(data); // Ajusta esto según la estructura de datos de tu API
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFinanciamientoOptions();
    }, []);

    const handleContact = () => {
        alert("Formulario de solicitud de financiamiento");
    };

    if (loading) return <p>Cargando opciones de financiamiento...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="financiamiento">
            <h2>Financiamiento de Vehículos</h2>
            <p>Descubre cómo el financiamiento puede ayudarte a adquirir el auto de tus sueños.</p>

            <h3>Opciones de Financiamiento</h3>
            {financiamientoOptions.length > 0 ? (
                <ul>
                    {financiamientoOptions.map((option, index) => (
                        <li key={index}>
                            <strong>{option.tipo}</strong>: Tasa de interés del {option.tasaInteres}% 
                            <br />
                            Plazos disponibles: {option.plazo.join(', ')} meses
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay opciones de financiamiento disponibles en este momento.</p>
            )}

            <h3>Consulta tu Estado de Deudor</h3>
            <ConsultaDeudor /> {/* Integración del componente de consulta */}

            <h3>Calculadora de Financiamiento</h3>
            <Calculator />
            
            <h3>Requisitos para el Financiamiento</h3>
            <ul>
                <li>Identificación</li>
                <li>Comprobante de ingresos</li>
                <li>Historial crediticio</li>
            </ul>
            
            <h3>Preguntas Frecuentes</h3>
            <FAQ />
            
            <button onClick={handleContact} className="contact-button">Solicitar financiamiento</button>
        </section>
    );
};

export default Financiamiento;
