import React from "react";
import Style from "./Pagination.module.css";

const Pagination = ({ current, setCurrent, max, input, setInput }) => {
  //es un componente funcional que recibe las siguientes propiedades: current (número de página actual),
  // setCurrent (función para actualizar la página actual), max (número máximo de páginas),
  //input (valor de entrada) e setInput (función para actualizar el valor de entrada).
  const next = () => {
    setCurrent(current + 1);
    setInput(input + 1);
  };
  //aumenta el número de página actual

  const previous = () => {
    setCurrent(current - 1);
    setInput(input - 1);
  };
  //disminuye el número de página actual

  return (
    <div className={Style.container}>
      <button disabled={current === 1} className={Style.btn} onClick={previous}>
        {"<"}
      </button>
      <input
        className={Style.input}
        type="text"
        maxLength="2"
        name="page"
        autoComplete="off"
        onChange={(event) => setInput(event)}
        value={input}
      />
      <span>of {max}</span>
      <button disabled={current === max} className={Style.btn} onClick={next}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
