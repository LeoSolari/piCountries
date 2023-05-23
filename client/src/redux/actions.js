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

export const getActivities = () => async (dispatch) => {
  try {
    let response = await axiosInstance.get("http://localhost:3001/activities");
    dispatch({ type: GET_ACTIVITIES, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSelectActivity = (payload) => (dispatch) => {
  return dispatch({ type: GET_SELECT_ACTIVITY, payload });
};

export const getSort = (payload) => (dispatch) => {
  return dispatch({ type: GET_SORT, payload });
};

export const population = (payload) => (dispatch) => {
  return dispatch({ type: POPULATION, payload });
};

export const continent = (payload) => (dispatch) => {
  return dispatch({ type: CONTINENT, payload });
};

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

export const deleteFilters = () => (dispatch) => {
  return dispatch({ type: "DELETE_FILTERS" });
};

export const errorClose = () => (dispatch) => {
  return dispatch({ type: CLOSE });
};
