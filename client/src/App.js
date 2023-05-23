import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
    </BrowserRouter>
  );
}

//se establece las rutas de la aplicación utilizando React Router. Cuando la URL coincide con "/", se renderiza el componente Home,
// y cuando la URL coincide con "/detail/:id", se renderiza el componente Detail pasando el valor del parámetro id como prop.

export default App;
