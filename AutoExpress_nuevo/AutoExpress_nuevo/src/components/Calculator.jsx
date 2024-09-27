import React, { useState } from 'react';

const Calculator = () => {
    const [price, setPrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = () => {
        const principal = price - downPayment;
        const interest = (interestRate / 100) / 12;
        const numberOfPayments = loanTerm * 12;
        
        const payment = (principal * interest) / (1 - Math.pow(1 + interest, -numberOfPayments));
        setMonthlyPayment(payment.toFixed(2));
    };

    return (
        <div className="calculator">
            <h4>Calculadora de Pagos Mensuales</h4>
            <input
                type="number"
                placeholder="Precio del vehículo"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Pago inicial"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
            />
            <input
                type="number"
                placeholder="Tasa de interés (%)"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Plazo (años)"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
            />
            <button onClick={calculatePayment}>Calcular</button>
            {monthlyPayment && <h5>Pago mensual: ${monthlyPayment}</h5>}
        </div>
    );
};

export default Calculator;
