const path = require('path');

// Load ORM Sequelize
const Sequelize = require('sequelize');

exports.configure_db = async function(db) {
  // Create connection with MySQL
  const sequelize = new Sequelize(db, 'jose', 'çpepe03266Jpa%',
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
  );

  try {
    await sequelize.sync();
    await sequelize.authenticate()
    console.log('Connected to MySQL!')
  } catch (err) {
    console.log('Error connecting to Database: ' + err)
  }

  // Import Models
  const Patient = sequelize.import(path.join(__dirname, 'patient'));
  const Hospital = sequelize.import(path.join(__dirname, 'hospital'));
  const Doctor = sequelize.import(path.join(__dirname, 'doctor'));


  // Relationships
  ///////

  // Rellene aqui para realizar las asociaciones entre los modelos anteriores

  ///////

  Hospital.hasMany(Patient);
  Patient.belongsTo(Hospital, {
    foreignKey: 'hospital_id'
  });

  Patient.belongsToMany(Doctor, { through: 'patient_doctor' });
Doctor.belongsToMany(Patient, { through: 'patient_doctor' });
  return {
    Hospital:  Hospital,
    Patient:  Patient,
    Doctor:  Doctor
  }

}