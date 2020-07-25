module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define(
    "Project",
    {
      // The email cannot be null, and must be a proper email before creation
      project: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    { timestamps: false }
  );

  Project.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Project.belongsTo(models.Car, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Project;
};
