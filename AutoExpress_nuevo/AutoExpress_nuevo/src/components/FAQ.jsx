import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "¿Puedo financiar un auto usado?",
            answer: "Sí, muchos bancos y concesionarios ofrecen financiamiento para autos usados."
        },
        {
            question: "¿Qué sucede si no puedo hacer un pago?",
            answer: "Es importante contactar a tu prestamista lo antes posible para discutir opciones."
        },
        {
            question: "¿Cuál es el monto mínimo para un financiamiento?",
            answer: "El monto mínimo varía según el prestamista, pero generalmente es de $5,000."
        }
    ];

    return (
        <div className="faq">
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <h5>{faq.question}</h5>
                    <p>{faq.answer}</p>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
