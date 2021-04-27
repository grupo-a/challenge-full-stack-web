'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    static associate(models) {
      // define association here
    }
  };
  Students.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tax: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Students',
  });

  model.systemFieds = [
    "id",
    "name",
    "email",
  ];
  model.notEditableFields = ["tax"];
  model.insert = async (data) => {
    model.systemFieds.forEach((field) => {
      delete data[field];
    });
    const result = await model.findAll({where: {tax: data.tax }});
    if (result.length) {
      throw new Error("CPF já cadastrado");
    }
    let students = await model.create(data);
    return students;
  };

  model.change = async (data) => {
    model.notEditableFields.forEach((field) => {
      delete data[field];
    });
    let students = await model.findByPk(data.id);
    Object.keys(data).forEach((el)=>{
        students[el] = data[el]
    })
    await students.save();
    return students;
  };

  model.getAll = async () => {
    const result = await model.findAll();
    return result 
  };

  model.delete = async (id) => {
    const results = await model.destroy({
      where: { id: id },
      truncate: true
    });
    return results 
  };

  return Students;
};