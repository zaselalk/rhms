// models/index.ts
import sequelize from ".";
import Resident from "./resident";
import Household from "./hosehold";
import HouseholdResident from "./householdresident";
import Household from "./household";
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
// Association: Household has many residents via HouseholdResident
Household.hasMany(HouseholdResident, {
  foreignKey: "householdId",
  as: "members",
});

HouseholdResident.belongsTo(Household, {
  foreignKey: "householdId",
  as: "household",
});

// Association: Resident can belong to many households via HouseholdResident
Resident.hasMany(HouseholdResident, {
  foreignKey: "residentId",
  as: "householdRelations",
});

HouseholdResident.belongsTo(Resident, {
  foreignKey: "residentId",
  as: "resident",
});

export { sequelize, Resident, Household, HouseholdResident };
