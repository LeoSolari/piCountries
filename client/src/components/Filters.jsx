import React, { useState, useEffect } from "react";
import axios from "axios";
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
  // const activities = useSelector((state) => state.activities);
  const [activityList, setActivityList] = useState([]);

  const [sortValue, setSortValue] = useState("sort");
  const [populationValue, setPopulationValue] = useState("population");
  const [continentsValue, setContinentsValue] = useState("all");
  //Se declaran estados para almacenar los valores seleccionados de los selectores

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3001/activities");
        setActivityList(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);
  //realizar una solicitud HTTP a la API y obtiene la lista de actividades.

  const handleSort = (event) => {
    dispatch(getSort(event.target.value));
    setSort(!sort);
  };
  //se ejecuta cuando se cambia el valor del selector de ordenamiento.

  const handlePopulation = (event) => {
    dispatch(population(event.target.value));
    setSort(!sort);
  };
  //se ejecuta cuando se cambia el valor del selector de población.

  const handleContinent = (event) => {
    dispatch(continent(event.target.value));
    setInput(1);
    setCurrent(1);
  };
  //se ejecuta cuando se cambia el valor del selector de continentes.

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(deleteFilters());
    setSortValue("sort");
    setPopulationValue("population");
    setContinentsValue("all");
  };
  //Esta función envía una acción deleteFilters al Redux para eliminar los filtros y luego restablece los estados

  const handleActivity = (event) => {
    dispatch(getSelectActivity(event.target.value));
  };
  //que se ejecuta cuando se cambia el valor del selector de actividad.

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
            value={sortValue}
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
            value={populationValue}
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
            value={continentsValue}
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
            {activityList?.map((event, i) => (
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
