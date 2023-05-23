const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      },
      duration: {
        type: DataTypes.STRING,
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
      },
      country: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: false }
  );
};
//name: Es un campo de tipo STRING, lo que significa que almacena cadenas de texto.
//difficulty: Es un campo de tipo ENUM, que define una lista de valores permitidos ("1", "2", "3", "4", "5").
//duration: Es un campo de tipo STRING, que almacena una cadena de texto.
//season: Es un campo de tipo ENUM, que define una lista de valores permitidos ("Summer", "Autumn", "Winter", "Spring"). Solo se permiten los valores especificados en el campo season.
//country: Es un campo de tipo ARRAY de STRING, lo que significa que almacena una matriz de cadenas de texto. Este campo puede contener múltiples valores de países.
//{ timestamps: false }: Este objeto de configuración se utiliza para desactivar el registro automático de los timestamps

//este código define el modelo de datos para la tabla "activity" en Sequelize.
//Especifica los campos de la tabla, sus tipos de datos y otras configuraciones como la opción de no generar timestamps automáticos.
//Esto permite a Sequelize interactuar con la base de datos y realizar operaciones CRUD en la tabla "activity" utilizando el modelo correspondiente.
