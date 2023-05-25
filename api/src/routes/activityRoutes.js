const { Router } = require("express");
//const { postActivity } = require('./controller');
const router = Router();
const { Activity, Country } = require("../db");

router.get("/", async (req, res) => {
  try {
    let getAll = await Activity.findAll();
    res.send(getAll);
  } catch (error) {
    res.status(404).send(error);
  }
});
//Este bloque define una ruta HTTP GET en la raíz ("/") del enrutador.
//la función busca todas las actividades en la base de datos utilizando el modelo Activity y luego envía los resultados como respuesta.

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  try {
    let newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    let countryDb = await Country.findAll({
      where: { name: country },
    });

    newActivity.addCountry(countryDb);

    res.send("Activity created successfully");
  } catch (error) {
    res.status(404).send(error);
  }
});
//Este bloque define una ruta HTTP POST en la raíz ("/") del enrutador.
//En este caso, la función extrae los datos del cuerpo de la solicitud (name, difficulty, duration, season y country),
//crea una nueva actividad en la base de datos utilizando el modelo Activity y establece la relación con el país correspondiente
//utilizando el modelo Country.

module.exports = router;
