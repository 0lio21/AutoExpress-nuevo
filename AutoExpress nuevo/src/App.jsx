import React from 'react';
import './App.css';
import Header from './components/Header';
import Inicio from './components/inicio';
import CarList from './components/CarList'; // Asegúrate de importar el componente correctamente
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/autos" element={<CarList />} /> {/* Componente cerrado correctamente */}
          <Route path="/autos/:brand" element={<CarList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
