import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "../redux/actions";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Errors from "../components/Errors";
import Create from "../components/Create";
import Style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.sorting);
  //Se utiliza la función useSelector para acceder al estado sorting almacenado en la tienda.
  //El estado sorting contiene la lista de países ordenados.
  const error = useSelector((state) => state.error);
  //Se utiliza para acceder al estado error almacenado en la tienda.
  const activities = useSelector((state) => state.activities);
  // Se utiliza para acceder al estado activities almacenado en la tienda. El estado activities contiene la lista de actividades.

  const [form, setForm] = useState(false);

  const [sort, setSort] = useState(true);

  const [input, setInput] = useState(1);
  //se utiliza para controlar la página actual en la paginación.
  const [current, setCurrent] = useState(1);
  const [perPage] = useState(5);
  //define la cantidad de países que se mostrarán por página.
  const max = Math.ceil(sorting.length / perPage);
  //Se calcula la cantidad máxima de páginas que se pueden mostrar,
  //dividiendo la longitud de la lista de países sorting entre la cantidad de países por página y redondeando hacia arriba.

  useEffect(() => {
    if (!sorting[0]) {
      dispatch(getCountries());
    }

    if (activities[0]) {
      dispatch(getActivities());
    }
  }, [dispatch, sorting, activities]);

  //Si la lista de países ordenados sorting está vacía, se envía una acción getCountries()
  //utilizando la función dispatch.
  //Si la lista de actividades activities no está vacía, se envía una acción getActivities()

  return (
    <div className={Style.container}>
      {sorting.length ? (
        <div className={Style.background}>
          <Nav />
          {error && <Errors />}
          {form && <Create setForm={setForm} />}
          <Filters
            setSort={setSort}
            sort={sort}
            setInput={setInput}
            setCurrent={setCurrent}
            setForm={setForm}
          />

          <div className={Style.flexContainer}>
            <div>
              {sorting
                ?.slice(
                  (current - 1) * perPage,
                  (current - 1) * perPage + perPage
                )
                .map((country) => {
                  return (
                    <div key={country.id}>
                      <Card
                        id={country.id}
                        name={country.name}
                        flag={country.flag}
                        continent={country.continent}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <Pagination
            current={current}
            setCurrent={setCurrent}
            max={max}
            input={input}
            setInput={setInput}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default Home;
