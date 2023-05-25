import axios from "axios";
import {
  CLOSE,
  CONTINENT,
  ERROR,
  GET_ACTIVITIES,
  GET_COUNTRIES,
  GET_SELECT_ACTIVITY,
  GET_SORT,
  POPULATION,
  SEARCH,
} from "./action-types";

// Crea una instancia de axios con la URL base configurada
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Cambia la URL base según tu servidor de backend
});

export const getCountries = () => async (dispatch) => {
  try {
    let response = await axiosInstance.get("/countries");
    dispatch({ type: GET_COUNTRIES, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};
//acción asíncrona que obtiene la lista de países.
//Utiliza axiosInstance para realizar una solicitud GET a la ruta "/countries".
//Si la solicitud se realiza correctamente, se despacha una acción con el tipo GET_COUNTRIES y los datos de respuesta se pasan como carga
//útil (payload) a la acción.

export const getActivities = () => async (dispatch) => {
  try {
    let response = await axios.get("/activities");
    dispatch({ type: GET_ACTIVITIES, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

//obtiene la lista de actividades turísticas.
//Realiza una solicitud GET a "http://localhost:3001/activities" y despacha una acción con el tipo GET_ACTIVITIES y
//los datos de respuesta como carga útil.

export const getSelectActivity = (payload) => (dispatch) => {
  return dispatch({ type: GET_SELECT_ACTIVITY, payload });
};

//es una acción que se utiliza para obtener la actividad seleccionada.
//Recibe un parámetro payload y despacha una acción con el tipo GET_SELECT_ACTIVITY y el payload proporcionado.

export const getSort = (payload) => (dispatch) => {
  return dispatch({ type: GET_SORT, payload });
};
//se utiliza para obtener el tipo de ordenamiento seleccionado.
//Recibe un parámetro payload y despacha una acción con el tipo GET_SORT y el payload proporcionado.

export const population = (payload) => (dispatch) => {
  return dispatch({ type: POPULATION, payload });
};

//se utiliza para obtener la población seleccionada.
//Recibe un parámetro payload y despacha una acción con el tipo POPULATION y el payload proporcionado.

export const continent = (payload) => (dispatch) => {
  return dispatch({ type: CONTINENT, payload });
};
//se utiliza para obtener el continente seleccionado.
//Recibe un parámetro payload y despacha una acción con el tipo CONTINENT y el payload proporcionado.

export const getByName = (value) => async (dispatch) => {
  try {
    let response = await axiosInstance.get(`/countries?name=${value}`);
    if (response.status === 200) {
      let json = response.data;
      return dispatch({ type: SEARCH, payload: json });
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    return dispatch({ type: ERROR });
  }
};
//es una acción asíncrona que se utiliza para buscar un país por su nombre.
//Recibe un parámetro value que representa el nombre del país a buscar.
//Realiza una solicitud GET a "/countries" con el parámetro de consulta name establecido en value.
//se despacha una acción con el tipo SEARCH y los datos de respuesta como carga útil.

export const deleteFilters = () => (dispatch) => {
  return dispatch({ type: "DELETE_FILTERS" });
};
//se utiliza para eliminar los filtros aplicados. Despacha una acción con el tipo "DELETE_FILTERS".

export const errorClose = () => (dispatch) => {
  return dispatch({ type: CLOSE });
};
//Esta función es una acción que se utiliza para cerrar un mensaje de error. Despacha una acción con el tipo CLOSE.
