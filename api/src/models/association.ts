import sequelize from ".";
import Resident from "./resident";
import Household from "./household";
import HouseholdResident from "./householdResident";
import Disease from "./disease";
import ResidentDisease from "./residentdisease";
import ResidentClinic from "./residentClinic";
import Clinic from "./clinic";
import Division from "./division";

// Associations
// HouseholdResident ↔ Resident
HouseholdResident.belongsTo(Resident, {
  foreignKey: "residentId", // use camelCase here
  as: "resident",
});

Resident.hasMany(HouseholdResident, {
  foreignKey: "residentId",
  as: "householdRelations",
});

// HouseholdResident ↔ Household
HouseholdResident.belongsTo(Household, {
  foreignKey: "householdId", // use camelCase here
  as: "household",
});

Household.hasMany(HouseholdResident, {
  foreignKey: "householdId",
  as: "residents",
});

// Household ↔ Owner (Resident)
Resident.hasMany(Household, {
  foreignKey: "owner_id", // this stays snake_case as per your DB column
  as: "households",
});

Household.belongsTo(Resident, {
  foreignKey: "owner_id",
  as: "owner",
});

// Disease and ResidentDisease associations
Resident.hasMany(ResidentDisease, {
  foreignKey: "residentId",
  as: "residentDiseases",
});
Disease.hasMany(ResidentDisease, {
  foreignKey: "diseaseId",
  as: "residentDiseases",
});

ResidentDisease.belongsTo(Resident, {
  foreignKey: "residentId",
  as: "resident",
});
ResidentDisease.belongsTo(Disease, { foreignKey: "diseaseId", as: "disease" });

// residentClinic associations

Resident.belongsToMany(Clinic, {
  through: ResidentClinic,
  foreignKey: "residentId",
  as: "clinics",
  otherKey: "clinicId",
});

Clinic.belongsToMany(Resident, {
  through: ResidentClinic,
  foreignKey: "clinicId",
  as: "residents",
  otherKey: "residentId",
});

ResidentClinic.belongsTo(Resident, {
  foreignKey: "residentId",
  as: "resident",
});

ResidentClinic.belongsTo(Clinic, {
  foreignKey: "clinicId",
  as: "clinic",
});

Resident.hasMany(ResidentClinic, {
  foreignKey: "residentId",
  as: "residentClinics",
});

Clinic.hasMany(ResidentClinic, {
  foreignKey: "clinicId",
  as: "residentClinics",
});

/**
 * Resident has division association
 */

Resident.belongsTo(Division, {
  foreignKey: "divisionId",
  as: "division",
});

Division.hasMany(Resident, {
  foreignKey: "divisionId",
  as: "residents",
});

// In Resident model
Resident.belongsTo(Division, {
  foreignKey: 'divisionId',
  as: 'division',
});

// In Division model
Division.hasMany(Resident, {
  foreignKey: 'divisionId',
  as: 'residents',
});


// Exporting models
export {
  sequelize,
  Resident,
  Household,
  Disease,
  ResidentDisease,
  HouseholdResident,
};
