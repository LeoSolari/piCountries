const axios = require("axios");
const { Country, Activity } = require("../db");

const getHome = async () => {
  try {
    let api = await axios.get("https://rest-countries.up.railway.app/v3/all");
    api = api.data?.map((e) => {
      return {
        id: e.cca3,
        name: e.name.common,
        flag: e.flags[0],
        continent: e.continents[0],
        capital: e.capital,
        subregion: e.subregion,
        area: e.area,
        population: e.population,
      };
    });

    let bdd = await Country.findAll();
    if (!bdd.length) {
      await Country.bulkCreate(api);
    }
    let db = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    db = db.map((e) => {
      return {
        id: e.id,
        name: e.name,
        flag: e.flag,
        continent: e.continent,
        capital: e.capital,
        subregion: e.subregion,
        area: e.area,
        population: e.population,
        activity: e.activities?.map((el) => el.name),
      };
    });
    return db;
  } catch (error) {
    console.log(error.message);
  }
};

//Esta función realiza una solicitud GET para obtener información sobre todos los países.
//Luego, procesa los datos obtenidos mapeando cada objeto de país para extraer solo las propiedades deseadas.
//verifica si existen registros en la tabla "Country" de la base de datos local.
//Si no hay registros, utiliza el método bulkCreate de Sequelize para insertar los datos de los países en la tabla.
//Luego, realiza otra consulta a la base de datos para obtener todos los países con la información de sus actividades asociadas.
//Finalmente, se mapea el resultado para estructurar los datos en un formato específico antes de devolverlos.

const getByName = async (name) => {
  let api = await axios.get(
    `https://rest-countries.up.railway.app/v3/name/${name}`
  );
  api = api.data[0];
  api = {
    id: api.cca3,
    name: api.name.common,
    flag: api.flags[1],
    continent: api.continents[0],
    capital: api.capital,
    subregion: api.subregion,
    area: api.area,
    population: api.population,
  };

  return api;
};

//Esta función realiza una solicitud GET para obtener información sobre un país en particular según su nombre.
//La variable {name} se pasa como parámetro en la URL.
//Después de obtener los datos, se procesan para extraer las propiedades deseadas y devolver el objeto resultante.

const getById = async (id) => {
  let api = await axios.get(
    `https://rest-countries.up.railway.app/v3/alpha/${id}`
  );
  api = api.data[0];
  api = {
    id: api.cca3,
    name: api.name.common,
    flag: api.flags[1],
    continent: api.continents[0],
    capital: api.capital,
    subregion: api.subregion,
    area: api.area,
    population: api.population,
  };
  return api;
};

//Esta función realiza una solicitud GET para obtener información sobre un país en particular según su ID.

module.exports = {
  getHome,
  getByName,
  getById,
};
