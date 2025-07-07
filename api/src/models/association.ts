// models/index.ts
import sequelize from ".";
import Resident from "./resident";
import Household from "./hosehold";
import HouseholdResident from "./householdresident";

// Associations
Resident.hasMany(Household, {
  foreignKey: "owner_id",
  as: "households",
});

Household.belongsTo(Resident, {
  foreignKey: "owner_id",
  as: "owner",
});

Resident.hasMany(HouseholdResident, {
  foreignKey: "residentId",
  as: "householdRelations",
});

Household.hasMany(HouseholdResident, {
  foreignKey: "householdId",
  as: "residentRelations",
});

HouseholdResident.belongsTo(Resident, {
  foreignKey: "residentId",
  as: "resident",
});

HouseholdResident.belongsTo(Household, {
  foreignKey: "householdId",
  as: "household",
});

export {
  sequelize,
  Resident,
  Household,
  HouseholdResident,
};
