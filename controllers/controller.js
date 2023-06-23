

module.exports = function (models) {
    var module = {};

    let Hospital = models.Hospital;
    let Patient = models.Patient;
    let Doctor = models.Doctor;

    // Buscar todos los hospitales
    module.list_hospitals = async function() {
        // Rellene aqui ...
        return Hospital.findAll()
    }

    // Filtra los hospitales por ciudad
    module.filterHospitalsByCity = async function (city) {
        // Rellene aqui ...
        return Hospital.findAll({
            where:{city}
        })
    }

    // Buscar pacientes de un hospital ordenadors por el nombre (de la A a la Z)
    module.list_hospital_patients = async function(hospital_id) {
        // Rellene aqui ...
        return Patient.findAll({
            where:{hospital_id}
        })
    }

    // Muestra la informacion de un paciente
    module.read = async function(patient_id) {
        // Rellene aqui ...
        //return Patient.findOne({where:{id:patient_id},})
        return Patient.findByPk(patient_id)
    }

    // Crea un paciente en un hospital
    module.create = async function(hospital_id, name, surname, dni) {
        console.log('mi hospital',hospital_id)
        // Rellene aqui ...
        const paciente=Patient.build({
            name, surname,dni,hospital_id
        })
        return await paciente.save();
       
    }

    // Actualiza un paciente
    module.update= async function(patient_id, name, surname, dni) {
        // Rellene aqui ...
       await Patient.update({name,surname,dni},{where:{id:patient_id}})
       return await Patient.findOne({where:{id:patient_id},})
    }

    // Borra un paciente
    module.delete = async function(patient_id) {
        // Rellene aqui ...
        return await Patient.destroy({where:{id:patient_id},})
    }

    // Asigna un doctor y devuelve los datos del paciente
    module.assignDoctor = async function (patient_id, doctor_id) {
        // Rellene aqui ...
        console.log('id_patient',patient_id)
        const paciente=await Patient.findOne({where:{id:patient_id},})
        console.log(paciente.name)
        const doctor=await Doctor.findOne({where:{id:doctor_id},})
         console.log('patient-doctor',paciente.name)
        await paciente.addDoctor(doctor,{ through: { selfGranted: false } })
      
        return Patient.findByPk(patient_id)
    }

    // Muestras los medicos de un paciente
    module.showPatientDoctors = async function (patient_id) {
        // Rellene aqui ...
        const paciente= await Patient.findOne({where:{id:patient_id},include:Doctor})
        return paciente.Doctors
    }


    return module;
};