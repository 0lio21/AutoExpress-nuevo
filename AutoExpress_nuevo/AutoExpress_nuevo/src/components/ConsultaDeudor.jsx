import React, { useState } from 'react';

const ConsultaDeudor = () => {
    const [dni, setDni] = useState('');
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConsulta = async () => {
        setError(null);
        setResultado(null);
        setLoading(true);

        try {
            const response = await fetch(`https://api.bcra.gob.ar/central-deudores?dni=${dni}`); // Cambia esto según el endpoint correcto
            if (!response.ok) {
                throw new Error('Error al consultar el estado de deudor');
            }
            const data = await response.json();

            // Verificar el status y procesar los resultados
            if (data.status === 0) {
                setResultado(data.results);
            } else {
                // Mostrar mensaje de error si status no es 0
                setError(data.errorMessages.join(', '));
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="consulta-deudor">
            <h2>Consulta de Estado de Deudor</h2>
            <input 
                type="text" 
                value={dni} 
                onChange={(e) => setDni(e.target.value)} 
                placeholder="Ingrese su DNI" 
            />
            <button onClick={handleConsulta} disabled={loading}>
                {loading ? 'Consultando...' : 'Consultar'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {resultado && (
                <div>
                    <h3>Resultado de la Consulta:</h3>
                    <p><strong>Denominación:</strong> {resultado.denominacion}</p>
                    {resultado.periodos.map((periodo, index) => (
                        <div key={index}>
                            <h4>Período: {periodo.periodo}</h4>
                            {periodo.entidades.map((entidad, idx) => (
                                <div key={idx}>
                                    <p><strong>Entidad:</strong> {entidad.entidad}</p>
                                    <p><strong>Situación:</strong> {entidad.situacion}</p>
                                    <p><strong>Fecha de Situación:</strong> {entidad.fechaSit1}</p>
                                    <p><strong>Monto:</strong> ${entidad.monto}</p>
                                    <p><strong>Días de Atraso:</strong> {entidad.diasAtrasoPago}</p>
                                    <p><strong>Refinanciaciones:</strong> {entidad.refinanciaciones ? 'Sí' : 'No'}</p>
                                    <p><strong>Recategorización Obligatoria:</strong> {entidad.recategorizacionOblig ? 'Sí' : 'No'}</p>
                                    <p><strong>Situación Jurídica:</strong> {entidad.situacionJuridica ? 'Sí' : 'No'}</p>
                                    <p><strong>Irrecuperabilidad por Disposición Técnica:</strong> {entidad.irrecDisposicionTecnica ? 'Sí' : 'No'}</p>
                                    <p><strong>En Revisión:</strong> {entidad.enRevision ? 'Sí' : 'No'}</p>
                                    <p><strong>Proceso Judicial:</strong> {entidad.procesoJud ? 'Sí' : 'No'}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConsultaDeudor;
