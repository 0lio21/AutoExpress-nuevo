import React, { useState } from 'react';
import ConsultaDeudor from './ConsultaDeudor';
import FAQ from './FAQ';
import carsData from '../data/carsData.json'; // Importa los datos de los autos
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importar Font Awesome
import '../estilos/Financiamiento.css';

const Financiamiento = () => {
  const financiamientoOptions = [
    { tipo: 'Crédito Personal', tasaInteres: 10, plazo: [12, 24, 36], montoMin: 5000, montoMax: 50000 },
    { tipo: 'Leasing', tasaInteres: 8, plazo: [24, 48, 60], montoMin: 20000, montoMax: 200000 },
    { tipo: 'Crédito Prendario', tasaInteres: 12, plazo: [12, 24, 36, 48], montoMin: 15000, montoMax: 100000 },
  ];

  const [creditSimulation, setCreditSimulation] = useState({
    amount: '',
    term: '',
    interestRate: '',
    monthlyPayment: 0,
    eligibleOptions: [],
    error: '',
    selectedCar: '',
    carPrice: 0,
  });

  const [selectedOption, setSelectedOption] = useState(null);

  // Estado para el formulario de verificación crediticia y archivos subidos
  const [creditCheck, setCreditCheck] = useState({
    dni: '',
    dniFront: null,
    dniBack: null,
    incomeProofs: []
  });

  // Función para manejar cambios en los campos de entrada
  const handleCreditChange = (e) => {
    const { name, value } = e.target;
    setCreditSimulation((prevSimulation) => ({
      ...prevSimulation,
      [name]: value,
    }));
  };

  // Función para manejar cambios en el formulario de verificación crediticia
  const handleCreditCheckChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'dniFront' || name === 'dniBack') {
      setCreditCheck((prevCheck) => ({
        ...prevCheck,
        [name]: files[0] // Asignar archivo para fotos del DNI
      }));
    } else if (name === 'incomeProofs') {
      setCreditCheck((prevCheck) => ({
        ...prevCheck,
        incomeProofs: Array.from(files) // Asignar múltiples archivos para comprobantes de ingresos
      }));
    } else {
      setCreditCheck((prevCheck) => ({
        ...prevCheck,
        [name]: value
      }));
    }
  };

  // Función para manejar la selección del auto
  const handleCarSelection = (e) => {
    const selectedCar = carsData.find((car) => car.id === parseInt(e.target.value));
    if (selectedCar) {
      setCreditSimulation((prevSimulation) => ({
        ...prevSimulation,
        selectedCar: selectedCar.model,
        amount: selectedCar.price, // Usar el precio del auto como monto de financiamiento
        carPrice: selectedCar.price,
        error: '',
        eligibleOptions: [],
        monthlyPayment: 0, // Reiniciar cálculo de pago mensual
      }));
    }
  };

  // Función para manejar la selección de la opción de financiamiento
  const handleOptionChange = (e) => {
    const option = financiamientoOptions.find((opt) => opt.tipo === e.target.value);
    if (option) {
      setSelectedOption(option); // Actualizar la opción seleccionada
      setCreditSimulation((prevSimulation) => ({
        ...prevSimulation,
        interestRate: option.tasaInteres, // Configurar la tasa de interés de la opción seleccionada
        term: '', // Reiniciar el campo de plazo
        error: '',
        monthlyPayment: 0, // Reiniciar el cálculo de pago mensual
      }));
    }
  };

  // Función para verificar el historial crediticio con el DNI
  const handleCreditCheck = () => {
    const { dni } = creditCheck;
    if (!dni) {
      alert('Por favor, ingrese un número de DNI para verificar.');
      return;
    }

    // Simulación de llamada a la API de verificación de historial crediticio con el DNI
    alert(`Verificando historial crediticio para el DNI: ${dni}`);
    // Aquí iría la lógica para verificar con una API real y mostrar los resultados.
  };

  // Función para verificar opciones de financiamiento y calcular el pago mensual
  const handleSimulateCredit = (e) => {
    e.preventDefault();
    const { amount, term, interestRate } = creditSimulation;
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100 / 12; // Tasa de interés mensual
    const n = parseInt(term); // Plazo en meses

    // Validaciones
    if (!principal || !rate || !n) {
      setCreditSimulation((prevSimulation) => ({
        ...prevSimulation,
        eligibleOptions: [],
        error: 'Por favor, completa todos los campos para realizar la simulación.',
      }));
      return;
    }

    // Calcular el pago mensual utilizando la fórmula de préstamos: M = P[r(1+r)^n]/[(1+r)^n – 1]
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);

    // Filtrar opciones de financiamiento
    const eligibleOptions = financiamientoOptions.filter(
      (option) =>
        principal >= option.montoMin && principal <= option.montoMax && option.plazo.includes(parseInt(term))
    );

    setCreditSimulation((prevSimulation) => ({
      ...prevSimulation,
      eligibleOptions,
      error: eligibleOptions.length === 0 ? 'No se encontraron opciones de financiamiento para los datos ingresados.' : '',
      monthlyPayment: monthlyPayment ? monthlyPayment.toFixed(2) : 0,
    }));
  };

  const handleContact = () => {
    alert('Formulario de solicitud de financiamiento.');
  };

  return (
    <section className="financiamiento container my-5">
      <h2 className="text-center mb-4">Financiamiento de Vehículos</h2>
      <p className="text-center">Descubre cómo el financiamiento puede ayudarte a adquirir el auto de tus sueños.</p>

      <h3 className="mt-4">Selecciona un Auto</h3>
      <div className="form-group">
        <select name="selectedCar" className="form-control" onChange={handleCarSelection}>
          <option value="">Seleccionar Auto</option>
          {carsData.map((car) => (
            <option key={car.id} value={car.id}>
              {car.make} {car.model} - ${car.price}
            </option>
          ))}
        </select>
      </div>

      {creditSimulation.selectedCar && (
        <div className="alert alert-info text-center">
          <h4>Auto Seleccionado: {creditSimulation.selectedCar}</h4>
          <p>Precio del auto: <strong>${creditSimulation.carPrice}</strong></p>
        </div>
      )}

      <h3 className="mt-4">Verificar Historial Crediticio</h3>
      <div className="form-group">
        <label htmlFor="dni">Número de DNI</label>
        <input
          type="text"
          name="dni"
          value={creditCheck.dni}
          onChange={handleCreditCheckChange}
          className="form-control"
          placeholder="Ingrese su número de DNI"
        />
      </div>
      <button className="btn btn-info" onClick={handleCreditCheck}>Verificar Historial</button>

      <h3 className="mt-4">Subir Documentación</h3>
      <form className="mb-4">
        <div className="form-group">
          <label>Foto delantera del DNI</label>
          <input
            type="file"
            name="dniFront"
            className="form-control-file"
            onChange={handleCreditCheckChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label>Foto trasera del DNI</label>
          <input
            type="file"
            name="dniBack"
            className="form-control-file"
            onChange={handleCreditCheckChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label>Comprobantes de ingresos (últimos 3 meses)</label>
          <input
            type="file"
            name="incomeProofs"
            className="form-control-file"
            onChange={handleCreditCheckChange}
            accept="application/pdf, image/*"
            multiple
          />
        </div>
      </form>

      <h3 className="mt-4">Simulación de Crédito</h3>
      <form onSubmit={handleSimulateCredit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Monto a financiar ($):</label>
              <input
                type="number"
                name="amount"
                value={creditSimulation.amount}
                onChange={handleCreditChange}
                className="form-control"
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Tasa de interés anual (%):</label>
              <input
                type="number"
                name="interestRate"
                value={creditSimulation.interestRate}
                onChange={handleCreditChange}
                className="form-control"
                readOnly // Este campo solo se puede leer
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Plazo (en meses):</label>
          <input
            type="number"
            name="term"
            value={creditSimulation.term}
            onChange={handleCreditChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Simular Crédito y Calcular Pago</button>
      </form>

      {creditSimulation.error && (
        <div className="alert alert-danger text-center">
          <p>{creditSimulation.error}</p>
        </div>
      )}

      {creditSimulation.monthlyPayment > 0 && (
        <div className="alert alert-info text-center">
          <h4>Resultado de la Simulación</h4>
          <p>El pago mensual estimado es de: <strong>${creditSimulation.monthlyPayment}</strong></p>
        </div>
      )}

      <h3 className="mt-4">Opciones de Financiamiento</h3>
      <ul className="list-group mb-4">
        {financiamientoOptions.map((option, index) => (
          <li key={index} className="list-group-item">
            <strong>{option.tipo}</strong> - Tasa de interés del {option.tasaInteres}% <br />
            Monto entre ${option.montoMin} y ${option.montoMax} <br />
            Plazos disponibles: {option.plazo.join(', ')} meses
          </li>
        ))}
      </ul>

      <h3 className="mt-4">Consulta tu Estado de Deudor</h3>
      <ConsultaDeudor />

      <h3 className="mt-4">Requisitos para el Financiamiento</h3>
      <ul className="list-group mb-4">
        <li className="list-group-item">Identificación</li>
        <li className="list-group-item">Comprobante de ingresos</li>
        <li className="list-group-item">Historial crediticio</li>
      </ul>

      <h3 className="mt-4">Preguntas Frecuentes</h3>
      <FAQ />

      <button onClick={handleContact} className="btn btn-success mt-4">Solicitar financiamiento</button>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <h5>Métodos de Pago</h5>
              <i className="fas fa-money-bill-wave fa-2x mx-2"></i>
              <i className="fas fa-credit-card fa-2x mx-2"></i>
              <i className="fas fa-university fa-2x mx-2"></i>
            </div>
            <div className="col-md-4">
              <h5>Tarjetas Aceptadas</h5>
              <i className="fab fa-cc-visa fa-2x mx-2"></i>
              <i className="fab fa-cc-mastercard fa-2x mx-2"></i>
              <i className="fab fa-cc-amex fa-2x mx-2"></i>
              <i className="fab fa-cc-paypal fa-2x mx-2"></i>
            </div>
            <div className="col-md-4">
              <h5>Información Adicional</h5>
              <p className="mb-1">Cuotas desde 3 hasta 60 meses</p>
              <p>Ofrecemos planes sin interés</p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Financiamiento;
