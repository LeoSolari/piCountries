const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.INTEGER,
      },
      population: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};

//El primer argumento es el nombre de la tabla, en este caso, "country".
//El segundo argumento es un objeto que describe los campos de la tabla y sus tipos de datos.
//id: Es un campo de tipo STRING, que almacena identificadores únicos para cada país. La propiedad allowNull se establece en false para indicar que no se permite que este campo sea nulo. Además, se define primaryKey: true para indicar que este campo es la clave primaria de la tabla.
//name: Es un campo de tipo TEXT, que almacena cadenas de texto. La propiedad allowNull se establece en false para indicar que no se permite que este campo sea nulo.
//flag: Es un campo de tipo STRING, que almacena la URL o la ruta de la bandera del país. La propiedad allowNull se establece en false para indicar que no se permite que este campo sea nulo.
//continent: Es un campo de tipo STRING, que almacena el nombre del continente al que pertenece el país. La propiedad allowNull se establece en false para indicar que no se permite que este campo sea nulo.
//capital: Es un campo de tipo ARRAY de STRING, que almacena una matriz de nombres de capitales del país.
//subregion: Es un campo de tipo STRING, que almacena el nombre de la subregión del país.
//area: Es un campo de tipo INTEGER, que almacena el área del país.
//population: Es un campo de tipo INTEGER, que almacena la población del país.
//{ timestamps: false }: Este objeto de configuración se utiliza para desactivar el registro automático de los timestamps

//este código define el modelo de datos para la tabla "country".
