import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSort,
  population,
  continent,
  deleteFilters,
  getSelectActivity,
} from "../redux/actions";
import Style from "./Filters.module.css";

const Filters = ({ setSort, sort, setInput, setCurrent, setForm }) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  const handleSort = (event) => {
    dispatch(getSort(event.target.value));
    setSort(!sort);
  };

  const handlePopulation = (event) => {
    dispatch(population(event.target.value));
    setSort(!sort);
  };

  const handleContinent = (event) => {
    dispatch(continent(event.target.value));
    setInput(1);
    setCurrent(1);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(deleteFilters());
    document.getElementById("sort").value = "sort";
    document.getElementById("population").value = "population";
    document.getElementById("continents").value = "all";
  };

  const handleActivity = (event) => {
    dispatch(getSelectActivity(event.target.value));
    setInput(1);
    setCurrent(1);
  };

  return (
    <div className={Style.container}>
      <div className={Style.stylesSelect}>
        <div className={Style.selectContainer}>
          <label htmlFor="" className={Style.label}>
            Ordenar
          </label>
          <select
            id="sort"
            name="Sort"
            className={Style.select}
            onChange={handleSort}
          >
            <option value="sort" className={Style.option}>
              Ordenar
            </option>
            <option value="asc" className={Style.option}>
              Nombre (A-Z)
            </option>
            <option value="desc" className={Style.option}>
              Nombre (Z-A)
            </option>
          </select>
        </div>
        <div className={Style.selectContainer}>
          <label htmlFor="" className={Style.label}>
            Poblacion
          </label>
          <select
            id="population"
            name="Population"
            className={Style.select}
            onChange={handlePopulation}
          >
            <option value="population" className={Style.option}>
              Poblacion
            </option>
            <option value="high" className={Style.option}>
              Mayor (↑)
            </option>
            <option value="low" className={Style.option}>
              Menor (↓)
            </option>
          </select>
        </div>
        <div className={Style.selectContainer}>
          <label htmlFor="" className={Style.label}>
            Continentes
          </label>
          <select
            id="continents"
            name="Continents"
            className={Style.select}
            onChange={handleContinent}
          >
            <option value="all" className={Style.option}>
              Todos
            </option>
            <option value="Africa" className={Style.option}>
              Africa
            </option>
            <option value="Antarctica" className={Style.option}>
              Antarctica
            </option>
            <option value="Asia" className={Style.option}>
              Asia
            </option>
            <option value="Europe" className={Style.option}>
              Europe
            </option>
            <option value="North America" className={Style.option}>
              America del Norte
            </option>
            <option value="Oceania" className={Style.option}>
              Oceania
            </option>
            <option value="South America" className={Style.option}>
              America del Sur
            </option>
          </select>
        </div>
        <div className={Style.selectContainer}>
          <label htmlFor="" className={Style.label}>
            Actividad
          </label>
          <select
            name="Actividad"
            className={Style.select}
            onChange={handleActivity}
          >
            <option value="Actividades" className={Style.option}>
              Actividades
            </option>
            {activities?.map((event, i) => (
              <option key={i} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className={Style.manageFilters}>
          <button className={Style.btn} onClick={() => setForm(true)}>
            Crear
          </button>
          <button className={Style.btn} onClick={handleClick}>
            <span>Limpiar Filtros</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
