import React from "react";
import Style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={Style.container}>
      <span className={Style.Spinner}></span>
    </div>
  );
};

//Crea el spinner para cuando se carga un componente

export default Spinner;
