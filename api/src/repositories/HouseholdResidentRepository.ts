import HouseholdResident from "../models/householdresident";
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
}
