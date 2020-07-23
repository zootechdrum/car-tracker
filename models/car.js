// Creating our Car model
module.exports = function (sequelize, DataTypes) {
  const Car = sequelize.define(
    "Car",
    {
      // The email cannot be null, and must be a proper email before creation
      make: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // The password cannot be null
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Car;
};
