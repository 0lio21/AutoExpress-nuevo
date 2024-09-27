import React, { useState } from 'react';
import '../estilos/Cotiza.css'; // Asegúrate de que la ruta sea correcta

const Cotiza = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        brand: '',
        year: '',
        mileage: '',
        doors: '',
        fuelType: '',
        color: '',
        licensePlate: '',
        hadAccidents: '',
        wasRepaired: '',
        frontPhoto: null,
        leftPhoto: null,
        rightPhoto: null,
        backPhoto: null,
        topPhoto: null,
        interiorPhotos: [], // Para almacenar las fotos del interior
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;

        // Manejar múltiples archivos para fotos interiores
        if (name === 'interiorPhotos') {
            setFormData({ ...formData, interiorPhotos: files });
        } else {
            setFormData({ ...formData, [name]: files[0] }); // Solo permite un archivo por campo
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar que al menos 3 fotos del interior sean seleccionadas
        if (formData.interiorPhotos.length < 3) {
            alert("Por favor, sube al menos 3 fotos del interior.");
            return;
        }

        // Aquí puedes agregar la lógica para enviar los datos, como una API o un servicio
        console.log('Datos enviados:', formData);
        // Resetea el formulario si es necesario
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            brand: '',
            year: '',
            mileage: '',
            doors: '',
            fuelType: '',
            color: '',
            licensePlate: '',
            hadAccidents: '',
            wasRepaired: '',
            frontPhoto: null,
            leftPhoto: null,
            rightPhoto: null,
            backPhoto: null,
            topPhoto: null,
            interiorPhotos: [],
        });
    };

    return (
        <div className="cotiza-container">
            <h1>Cotiza tu auto</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Tu nombre:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Tu email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Tu teléfono:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Marca del vehículo:
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Año del vehículo:
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Kilometraje:
                    <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cantidad de puertas:
                    <input
                        type="number"
                        name="doors"
                        value={formData.doors}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Tipo de combustible:
                    <input
                        type="text"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Color:
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Patente:
                    <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    ¿Tuvo choques?:
                    <select
                        name="hadAccidents"
                        value={formData.hadAccidents}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                    </select>
                </label>
                <label>
                    ¿Fue arreglado o refaccionado?:
                    <select
                        name="wasRepaired"
                        value={formData.wasRepaired}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar</option>
                        <option value="sí">Sí</option>
                        <option value="no">No</option>
                    </select>
                </label>
                <label>
                    Mensaje o descripción del vehículo:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Subir foto del frente:
                    <input
                        type="file"
                        name="frontPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </label>
                <label>
                    Subir foto del costado izquierdo:
                    <input
                        type="file"
                        name="leftPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </label>
                <label>
                    Subir foto del costado derecho:
                    <input
                        type="file"
                        name="rightPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </label>
                <label>
                    Subir foto de atrás:
                    <input
                        type="file"
                        name="backPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </label>
                <label>
                    Subir foto de arriba:
                    <input
                        type="file"
                        name="topPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </label>
                <label>
                    Subir fotos del interior (mínimo 3):
                    <input
                        type="file"
                        name="interiorPhotos"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple // Permitir subir múltiples archivos
                        required
                    />
                </label>
                <button type="submit">Enviar cotización</button>
            </form>
        </div>
    );
};

export default Cotiza;
