import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../redux/actions";
import Style from "./Create.module.css";

const Create = ({ setForm }) => {
  let countries = useSelector((state) => state.countries);
  let sorting = useSelector((state) => state.sorting);
  //Declara las variables countries y sorting utilizando el hook useSelector de React Redux.
  //Estas variables se utilizan para acceder al estado global de Redux y obtener los valores de state.countries y state.sorting.

  const dispatch = useDispatch();

  // Declara el Dispatch

  const [error, setError] = useState({});
  const [create, setCreate] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });
  //almacena un objeto con los valores del formulario.

  useEffect(() => {
    setError(validateCreate(create));
    if (!sorting[0]) dispatch(getCountries());
  }, [dispatch, sorting, create]);

  const validateCreate = (create) => {
    const errors = {};
    if (create.name.length < 3) errors.name = true;

    if (create.difficulty === "") errors.difficulty = "invalid";

    if (create.duration === "") errors.duration = "invalid";

    if (create.season === "") errors.season = "invalid";

    if (!create.country[0]) errors.country = "invalid";

    return errors;
  };

  const handleInput = (event) => {
    setCreate({
      ...create,
      [event.target.name]: event.target.value,
    });
  };
  // se utiliza como manejador de eventos para el cambio de entrada en el formulario.
  // Actualiza el estado create con los nuevos valores ingresados en el campo correspondiente.

  const handleSelect = (event) => {
    if (event.target.value !== "countries") {
      setCreate({
        ...create,
        country: [...create.country, event.target.value],
      });
    }
  };

  //Define la función handleSelect que se utiliza como manejador de eventos para la selección de opciones en el formulario. Agrega la opción seleccionada al arreglo country en el estado create.

  const handleCreate = () => {
    axios.post("http://localhost:3001/activities", create);
    setForm(false);
  };

  //Define la función handleCreate que se utiliza como manejador de eventos para el envío del formulario. Realiza una solicitud POST a la ruta "http://localhost:3001/activities" con los datos del formulario almacenados en create. Luego, establece setForm en falso para ocultar el formulario.

  const handleDelete = (event) => {
    event.preventDefault();
    setCreate({
      ...create,
      country: create.country.filter(
        (country) => country !== event.target.value
      ),
    });
  };

  //Define la función handleDelete que se utiliza como manejador de eventos para eliminar una opción seleccionada del arreglo country en el estado create.

  let countriesSorted = countries.sort((a, b) => a.name.localeCompare(b.name));

  //La variable countriesSorted se utiliza para almacenar el arreglo countries ordenado alfabéticamente según el nombre.

  return (
    <div className={Style.container}>
      <div className={Style.card}>
        <div className={Style.flex}>
          <button className={Style.close} onClick={() => setForm(false)}>
            X
          </button>
        </div>
        <form className={Style.form} onSubmit={handleCreate}>
          <div className={Style.input_container}>
            <h2 className={Style.title}>Create Activity</h2>
            <div className={Style.column}>
              <div className={Style.div}>
                <label className={Style.label}>Nombre</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  className={Style.input}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className={Style.column}>
              <div className={Style.div}>
                <label className={Style.label}>Dificultad</label>
                <select
                  name="difficulty"
                  onChange={handleInput}
                  className={Style.input}
                >
                  <option value="">Elegir dificultad</option>
                  <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                  <option value="2">⭐⭐ ☆ ☆ ☆</option>
                  <option value="3">⭐⭐⭐ ☆ ☆</option>
                  <option value="4">⭐⭐⭐⭐ ☆</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
              </div>
            </div>
            <div className={Style.column}>
              <div className={Style.div}>
                <label className={Style.label}>Duracion</label>
                <input
                  type="number"
                  name="duration"
                  onChange={handleInput}
                  className={Style.input}
                  min="1"
                  max="100"
                />
              </div>
            </div>
            <div className={Style.column}>
              <div className={Style.div}>
                <label className={Style.label}>Estaciones</label>
                <select
                  name="season"
                  onChange={handleInput}
                  className={Style.input}
                >
                  <option value="Summer">Verano</option>
                  <option value="Autumn">Otoño</option>
                  <option value="Winter">Invierno</option>
                  <option value="Spring">Primavera</option>
                </select>
              </div>
            </div>
            <div className={Style.column}>
              <div className={Style.div}>
                <label className={Style.label}>Paises</label>
                <select
                  name="country"
                  onChange={handleSelect}
                  className={Style.input}
                >
                  <option value="countries">Elegir Pais</option>
                  {countriesSorted?.map((event, i) => (
                    <option key={i} value={event.name}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={Style.flagBox}>
              {create.country?.map((country, i) => (
                <span key={i} className={Style.span} value={country}>
                  {country}
                  <button
                    onClick={handleDelete}
                    className={Style.btnDelete}
                    value={country}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className={Style.btnBox}>
            <button
              type="submit"
              className={Style.btn}
              hidden={Object.entries(error).length ? true : false}
            >
              <span className={Style.shadow}></span>
              <span className={Style.edge}></span>
              <span className={Style.front}>Crear</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Create;
