import React from "react";
import Style from "./LandingPage.module.css";
import car from "../assets/car.png";
import wheel from "../assets/wheel.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={Style.container}>
      <div className={Style.hero}>
        <div className={Style.carText}>
          <h1>Haz click en el auto para ingresar!</h1>
        </div>
        <div className={Style.highway}></div>
        <div className={Style.city}></div>
        <div className={Style.car}>
          <Link to="/home">
            <img src={car} alt="car" />
          </Link>
        </div>
        <div className={Style.wheel}>
          <img className={Style.frontWheel} src={wheel} alt="front-wheel" />
          <img className={Style.backWheel} src={wheel} alt="back-wheel" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
