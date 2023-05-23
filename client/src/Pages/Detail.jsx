import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Style from "./Detail.module.css";

const Detail = () => {
  const [country, setCountry] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/countries/${id}`
        );
        setCountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const formatter = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    useGrouping: true,
  });

  return (
    <div>
      {country ? (
        <div className={Style.container}>
          <div>
            <h3>{country.id}</h3>
            <Link to="/">
              <button>Volver al inicio</button>
            </Link>
          </div>
          <img src={country.flag} alt={country.name} />
          <h3>{country.name}</h3>
          <div>
            <p>
              Poblacion: <span>{formatter.format(country.population)}</span>{" "}
            </p>
            <p>
              Continente: <span>{country.continent}</span>
            </p>
            <p>
              Subregion: <span> {country.subregion}</span>
            </p>
            <p>
              Area: <span>{formatter.format(country.area)}km²</span>
            </p>
            <p>
              Capital: <span>{country.capital}</span>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Detail;
