module.exports = function(sequelize, DataTypes) {
  const Patient = sequelize.define(
    'Patient',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       
      },
      name: {
        type: DataTypes.STRING()
      },
      surname: {
        type: DataTypes.STRING()
      },
      dni: {
        type: DataTypes.STRING()
      }
    },
    {
      tableName: 'patient',
      timestamps: true,
      underscored: true,
    }
  );

  return Patient;
};