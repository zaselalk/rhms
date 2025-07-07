// models/index.ts
import sequelize from ".";
import Resident from "./resident";
import Household from "./hosehold";

import Disease from "./disease";
import ResidentDisease from "./residentdisease";

// Associations
Resident.hasMany(Household, {
  foreignKey: "owner_id",
  as: "households",
});

Household.belongsTo(Resident, {
  foreignKey: "owner_id",
  as: "owner",
});



// Disease and ResidentDisease associations
Resident.hasMany(ResidentDisease, { foreignKey: 'residentId', as: 'residentDiseases' });
Disease.hasMany(ResidentDisease, { foreignKey: 'diseaseId', as: 'residentDiseases' });

ResidentDisease.belongsTo(Resident, { foreignKey: 'residentId', as: 'resident' });
ResidentDisease.belongsTo(Disease, { foreignKey: 'diseaseId', as: 'disease' });


// Exporting models
export {
  sequelize,
  Resident,
  Household,
  Disease,
  ResidentDisease

};
