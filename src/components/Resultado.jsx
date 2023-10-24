import {Fragment, useCallback, useRef } from "react";
import useCotizador from "../hooks/useCotizador";
import { MARCAS, PLANES } from '../constants';

export default function Resultado() {
  const { resultado, datos } = useCotizador()
  const { marca, plan, año } = datos
  const [nombreMarca] = useCallback(
    MARCAS.filter(m => m.id === Number(marca)),
    [resultado])
  const [nombrePlan] = useCallback(
    PLANES.filter((p) => p.id === Number(plan)),
    [resultado]);
  const yearRef = useRef(año)
    if (resultado === 0) return null
    
    return (
      <div className="bg-gray-100 text-center mt-5 p-5 shadow">
        <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>

        <p className="my-2">
          <span className="font-bold">Marcar: </span>
          {nombreMarca.nombre}
        </p>

        <p className="my-2">
          <span className="font-bold">Plan: </span>
          {nombrePlan.nombre}
        </p>
        <Fragment>
          <p className="my-2">
            <span className="font-bold">Año del vehículo: </span>
            {yearRef.current}
          </p>
        </Fragment>
        <p className="my-2 text-2xl">
          <span className="font-bold">Total Póliza: </span>
          {resultado}
        </p>
      </div>
    );
}
