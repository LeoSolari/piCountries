import React from "react";
import { useDispatch } from "react-redux";
import { errorClose } from "../redux/actions";
import Style from "./Errors.module.css";

const Errors = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(errorClose());
  };

  return (
    <div className={Style.container}>
      <h2>Oops! No se ha encontrado lo que estabas buscando</h2>
      <h1>404</h1>
      <h2>Prueba nuevamente</h2>
      <div className={Style.btn1}>
        <button onClick={handleClick}>Cerrar</button>
      </div>
    </div>
  );
};

export default Errors;
