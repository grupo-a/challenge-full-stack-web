const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    ra: DataTypes.INTEGER,
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  return User;
};

module.exports = User;