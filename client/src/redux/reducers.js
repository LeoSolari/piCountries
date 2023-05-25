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

const initialState = {
  countries: [],
  sorting: [],
  error: false,

  activities: [],
};
//Este objeto representa el estado inicial de la aplicación.

//función reducer principal que recibe el estado actual y una acción como parámetros.
//Basado en el tipo de acción, actualiza el estado de la aplicación.
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      const a = [...action.payload];
      return {
        ...state,
        countries: action.payload,
        sorting: a,
      };
    //Actualiza el estado con la lista de países proporcionada en la carga útil de la acción.
    //También se crea una copia de la lista de países para su uso posterior en el ordenamiento y filtrado.

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    //Actualiza el estado con la lista de actividades turísticas proporcionada en la carga útil de la acción.

    case GET_SELECT_ACTIVITY:
      const result = state.countries.filter((event) =>
        event.activity.includes(action.payload)
      );
      return {
        ...state,
        sorting: result,
      };
    //Filtra los países en función de la actividad proporcionada en la carga útil de la acción.
    // Crea una nueva lista de países (result) que incluye solo aquellos países que tienen la actividad específica.
    // Actualiza el estado con la lista filtrada.

    case GET_SORT:
      const sort =
        action.payload === "asc"
          ? state.sorting.sort((a, b) => {
              if (a.name > b.name) return 1;

              if (a.name < b.name) return -1;

              return 0;
            })
          : action.payload === "desc"
          ? state.sorting.sort((a, b) => {
              if (a.name > b.name) return -1;

              if (a.name < b.name) return 1;

              return 0;
            })
          : [...state.countries];
      return {
        ...state,
        sorting: sort,
      };
    //Ordena la lista de países en función del criterio de ordenamiento proporcionado en la carga útil de la acción.
    //Si el criterio es "asc" (ascendente), se ordena alfabéticamente en orden ascendente según el nombre.
    // Si el criterio es "desc" (descendente), se ordena alfabéticamente en orden descendente según el nombre.
    // Si el criterio no coincide con ninguno de estos valores, se devuelve una copia de la lista original de países.
    // Actualiza el estado con la lista ordenada.

    case POPULATION:
      const sortPopulation =
        action.payload === "high"
          ? state.sorting.sort((a, b) => b.population - a.population)
          : action.payload === "low"
          ? state.sorting.sort((a, b) => a.population - b.population)
          : [...state.countries];
      return {
        ...state,
        sorting: sortPopulation,
      };
    //Ordena la lista de países en función del criterio de población proporcionado en la carga útil de la acción.
    //Si el criterio es "high" (alto), se ordena en orden descendente según la población.
    //Si el criterio es "low" (bajo), se ordena en orden ascendente según la población.
    //Si el criterio no coincide con ninguno de estos valores, se devuelve una copia de la lista original de países.
    //Actualiza el estado con la lista ordenada.

    case CONTINENT:
      const select = [...state.countries];
      let filter = select.filter((event) => event.continent === action.payload);
      console.log(filter);
      return {
        ...state,
        sorting: action.payload === "all" ? [...state.countries] : filter,
      };
    // Filtra los países en función del continente proporcionado.

    case SEARCH:
      return {
        ...state,
        sorting: [action.payload],
        error: false,
      };
    //Actualiza el estado con la lista de países proporcionada en la carga útil de la acción.
    // Esta acción se utiliza para mostrar los resultados de búsqueda de un país específico.

    case "DELETE_FILTERS":
      return {
        ...state,
        sorting: state.countries,
      };
    // Restablece la lista de países ordenados

    case ERROR:
      return {
        ...state,
        error: true,
      };
    //Establece la propiedad error del estado en true, lo que indica que se produjo un error.
    case CLOSE:
      return {
        ...state,
        error: state.error === false ? false : false,
      };

    default:
      return state;
  }
};

export default rootReducer;
