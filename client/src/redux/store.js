import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//Redux Thunk permite que las acciones de Redux sean funciones asíncronas en lugar de objetos
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));
//se crea la store de Redux

export default store;
