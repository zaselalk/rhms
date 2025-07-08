// models/index.ts
import sequelize from ".";
import Resident from "./resident";
import Household from "./hosehold";

// Associations
Resident.hasMany(Household, {
  foreignKey: "owner_id",
  as: "households",
});

Household.belongsTo(Resident, {
  foreignKey: "owner_id",
  as: "owner",
});

export { sequelize, Resident, Household };
