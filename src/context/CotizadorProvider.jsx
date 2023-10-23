import { createContext, useState } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";


const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    año: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  function cotizarSeguro() {
    // Una base
    let resultado = 2000
    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.año)
    // Hay que restar el 3% por cada año
    resultado -= ((diferencia * 3) * resultado) / 100
    // Europeo 30%
    // Americano 15%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca)
    console.log(resultado)
    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan);
    // resultado = resultado.toFixed(2) así o de la siguiente forma:
    // Formatear dinero

    resultado = formatearDinero(resultado)
    console.log(resultado)
  }

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorContext, CotizadorProvider };
