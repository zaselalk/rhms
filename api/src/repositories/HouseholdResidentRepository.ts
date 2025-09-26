import HouseholdResident from "../models/householdResident";
import Resident from "../models/resident";

export class HouseholdResidentRepository {
  async findByHouseholdId(householdId: number): Promise<HouseholdResident[]> {
    return HouseholdResident.findAll({
      where: { householdId },
      include: [
        {
          model: Resident,
          as: "resident",
          attributes: ["id", "firstName", "lastName", "birthday"],
        },
      ],
    });
  }

  async addResidentToHousehold(
    householdId: number,
    residentId: number,
    relation: string
  ): Promise<HouseholdResident> {
    return HouseholdResident.create({
      householdId,
      residentId,
      relation,
    });
  }

  async removeResidentFromHousehold(id: number): Promise<boolean> {
    const record = await HouseholdResident.findByPk(id);
    if (!record) return false;
    await record.destroy();
    return true;
  }

  async removeAllResidentsByHouseholdId(householdId: number): Promise<void> {
  await HouseholdResident.destroy({ where: { householdId } });
}


  

  async updateOwnerResidentRelation(householdId: number, newResidentId: number): Promise<boolean> {
  console.log("Updating owner resident relation...");
  console.log("Household ID:", householdId);
  console.log("New Resident ID:", newResidentId);

  const ownerRecord = await HouseholdResident.findOne({
    where: {
      householdId,
      relation: 'Owner',
    },
  });

  if (!ownerRecord) {
    console.warn(`No 'Owner' found for householdId: ${householdId}`);
    return false;
  }

  console.log("Old Resident ID:", ownerRecord.residentId);

  ownerRecord.residentId = newResidentId;
  await ownerRecord.save();

  console.log("Updated Owner Record:", ownerRecord.toJSON());

  return true;
}

}
