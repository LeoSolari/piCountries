const { Router } = require("express");
const { getHome, getByName, getById } = require("../controllers/controller");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const getName = await getByName(name);
      res.send(getName);
    } else {
      const api = await getHome();
      res.send(api);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});
//Este bloque define una ruta HTTP GET en la raíz ("/") del enrutador.
//En este caso, la función verifica si el parámetro de consulta name está presente en la solicitud.
// Si existe, llama a la función getByName() con el valor de name y envía los resultados como respuesta.
//  Si no se proporciona el parámetro name, llama a la función getHome() y envía los resultados como respuesta.

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let getId = await getById(id);
    res.send(getId);
  } catch (error) {
    res.status(404).send(error);
  }
});
//Este bloque define una ruta HTTP GET con un parámetro de ruta (id).
//En este caso, la función llama a la función getById() con el valor del parámetro id y envía los resultados como respuesta.

module.exports = router;
