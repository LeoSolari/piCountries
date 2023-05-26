import React from "react";
import { Link } from "react-router-dom";
import Style from "./Card.module.css";

const Card = ({ id, flag, name, continent }) => {
  return (
    <div>
      <Link to={`/detail/${id}`} className={Style.container}>
        <img src={flag} alt={name} className={Style.img} />
        <div className={Style.textContainer}>
          <h3 className={Style.name}>{name}</h3>

          <p className={Style.continent}>{continent}</p>
        </div>
      </Link>
    </div>
  );
};

// Aqui se crear las cards que se van a mostrar en el home y se define un link para la ruta detail

export default Card;
