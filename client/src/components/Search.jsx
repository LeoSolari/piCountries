import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";
import Style from "./Search.module.css";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Se define el valor de Search como el valor ingresado en el input

  const handleSubmit = () => {
    if (search.length) {
      dispatch(getByName(search));
    }
  };

  //Se ejecuta cuando el usuario hace clic en el botón de búsqueda. Verifica si la variable search tiene una longitud mayor a cero
  //si se cumple esta condición, se dispara la acción getByName pasando el valor de search como argumento.

  return (
    <div className={Style.searchBar}>
      <input
        className={Style.input}
        placeholder="Buscar"
        onChange={(e) => handleSearch(e)}
        value={search}
      />
      <button
        type="submit"
        className={Style.searchBtn}
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
};

export default Search;
