require("dotenv").config();
const { Sequelize } = require("sequelize"); //Sequelize es una clase que representa la conexión y el ORM para interactuar con la base de datos.
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false,
    native: false,
  }
);
//crea una nueva instancia de Sequelize, pasando la cadena de conexión a la base de datos
//y algunas opciones de configuración, como la desactivación del registro de consultas (logging: false)
//y el uso de pg-native para mejorar el rendimiento (native: false).

const basename = path.basename(__filename); //utiliza el método basename() del módulo path para obtener el nombre base del archivo actual.

const modelDefiners = []; //inicializa un arreglo modelDefiners que se utilizará para almacenar las definiciones de modelos.

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
// recorre el arreglo modelDefiners y llama a cada función de definición de modelo,
//pasando la instancia de sequelize como argumento. Esto crea los modelos en la conexión de la base de datos.
let entries = Object.entries(sequelize.models);
// obtiene un array de pares clave-valor de los modelos definidos en sequelize.models.
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
//capitaliza los nombres de los modelos en el array entries
sequelize.models = Object.fromEntries(capsEntries);
//actualiza sequelize.models con el nuevo objeto que contiene los nombres de modelos capitalizados.

const { Country, Activity } = sequelize.models;
// utiliza la desestructuración para asignar los modelos Country y Activity a variables separadas. Esto facilita la manipulación y las

Country.belongsToMany(Activity, { through: "country_activity" });
Activity.belongsToMany(Country, { through: "country_activity" });
// Estos bloques establecen una relación de muchos a muchos entre los modelos Country y Activity.
//Se utiliza el método belongsToMany() para establecer la relación y se proporciona el nombre de la tabla de unión como argumento en la opción through.
//Esto indica que la relación se gestionará a través de la tabla llamada "country_activity".

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

//exporta un objeto que contiene todos los modelos definidos en sequelize.models y la conexión sequelize como propiedad conn.
//Al utilizar el operador de propagación (...), se copian todas las propiedades de sequelize.models al objeto exportado.
