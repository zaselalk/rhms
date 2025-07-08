import sequelize from ".";
import Resident from "./resident";
import Household from "./household";
import HouseholdResident from "./householdResident";

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

export {
  sequelize,
  Resident,
  Household,
  HouseholdResident,
};
