// Adjust the import path as necessary
import Household from "../models/household";
import Resident from "../models/resident";

export class HouseholdRepository {
  async createHousehold(
    house_no: string,
    grama_division: string,
    longitude: string,
    latitude: string,
    owner_id?: number,
  ): Promise<Household> {
    return await Household.create({
      id: 0, // Assuming id is auto-incremented by the database
      house_no,
      grama_division,
      longitude,
      latitude,
      owner_id,
    });
  }

  // Read data
  async getAllHouseholdsWithOwnerName(): Promise<any[]> {
    return await Household.findAll({
      attributes: ["house_no", "owner_id", "grama_division", "id"],
      include: [
        {
          model: Resident,
          as: "owner", // match the alias used in the association
          attributes: ["firstName", "lastName"], // only include resident name
        },
      ],
    });
  }

  // Read households in a division with owner name and number of residents
  async getHouseholdsInDivisionWithResidentCount(
    division: string,
  ): Promise<any[]> {
    return await Household.findAll({
      where: { grama_division: division },
      include: [
        {
          model: Resident,
          as: "owner", // assuming association alias for owner
          attributes: ["firstName", "lastName"],
        },
        {
          model: Resident,
          as: "residents", // assuming this alias is used in association
          attributes: [],
        },
      ],
      group: [
        "Household.house_no",
        "owner.id",
        "owner.firstName",
        "owner.lastName",
      ],
      raw: true,
      nest: true,
      attributes: [
        "house_no",
        [Household.sequelize!.col("owner.firstName"), "ownerFirstName"],
        [Household.sequelize!.col("owner.lastName"), "ownerLastName"],
        [
          Household.sequelize!.fn(
            "COUNT",
            Household.sequelize!.col("residents.id"),
          ),
          "residentCount",
        ],
      ],
    });
  }

  // Update Household Owner
  async updateOwnerByHouseNo(
    house_no: string,
    owner_id: number,
  ): Promise<boolean> {
    const household = await Household.findOne({ where: { house_no } });
    if (!household) return false; // If no household found with house_no

    household.owner_id = owner_id; // Update the owner_id
    await household.save(); // Save the changes
    return true;
  }

  // Delete Household by house_no
  async deleteHouseholdByHouseNo(house_no: string): Promise<boolean> {
    const household = await Household.findOne({ where: { house_no } });
    if (!household) {
      return false; // Return false if the household is not found
    }

    await household.destroy(); // Delete the household
    return true; // Return true after deleting the household
  }

  // Find Household by house_no
  async findHouseholdByHouseNo(house_no: string): Promise<Household | null> {
    return Household.findOne({ where: { house_no } });
  }

  // Household Count
  async householdCount(): Promise<number> {
    return Household.count();
  }

  // Fetch households by division (grama_division)
  async findHouseholdsByDivision(divisionId: string): Promise<Household[]> {
    return Household.findAll({
      where: { grama_division: divisionId },
    });
  }

  // Count households by division (grama_division)
  async countHouseholdsByDivision(divisionId: string): Promise<number> {
    return Household.count({
      where: { grama_division: divisionId },
    });
  }
  //

}
