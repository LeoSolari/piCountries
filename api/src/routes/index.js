const { Router } = require("express");
const countryRoutes = require("./countryRoutes");
const activityRoutes = require("./activityRoutes");
// importan los archivos de rutas countryRoutes y activityRoutes.

const router = Router();

router.use("/countries", countryRoutes);
router.use("/activities", activityRoutes);
//define el uso de las rutas importadas dentro del enrutador. Cuando se recibe una solicitud
//con una URL que comienza con "/countries", el enrutador utilizará las rutas definidas en countryRoutes. Del mismo modo,
//cuando se recibe una solicitud con una URL que comienza con "/activities", el enrutador utilizará las rutas definidas en activityRoutes.

module.exports = router;
