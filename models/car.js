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

  Car.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Car.belongsTo(
      models.User,
      {
        foreignKey: {
          allowNull: false,
        },
      },
      Car.hasMany(models.Project, {
        foreignKey: {
          allowNull: false,
        },
      })
    );
  };
  return Car;
};
