import { Household } from "../models/hosehold";
import Resident from "../models/resident";



export class ResidentRepository {
  async findresidentById(id: number) {
    return await Household.findOne({
      where: {
        owner_id: id, // Ensure 'id' is part of HouseholdAttributes
      },
    });
  }
}
export class HouseholdRepository {
  async createHousehold(
    house_no: string,
    grama_division: string,
    longitude: string,
    latitude: string,
    owner_id?: number
  ): Promise<Household> {
    return await Household.create({
      id: 0, // Assuming id is auto-incremented by the database
      house_no,
      grama_division,
      longitude,
      latitude,
      owner_id
    });
  }

  
  // async findByHouseno(house_no: string) /*: Promise<Household | null>*/ {
  //   console.log('househols model:',Household); // Debugging step
  //   if (!Household) {
  //     throw new Error("Household model is not defined");
  //   }

  //   return await Household.findOne({
  //     where: {
  //       house_no,
  //     },
  //   });
  // }

  //  // Find by ID
  //  async findById(id: number): Promise<Household | null> {
  //   return Household.findByPk(id);
  // }

  // // Find by ID and include owner details
  // async findByIdWithOwner(id: number): Promise<any> {
  //   return Household.findByPk(id, {
  //     include: [
  //       {
  //         model: Resident,
  //         as: "owner", // Must match association alias
  //         attributes: ["name"],
  //       },
  //     ],
  //   });
  // }

  // // Update household owner
  // async updateOwner(id: number, new_owner_id: number): Promise<Household> {
  //   const household = await Household.findByPk(id);
  //   if (!household) throw new Error("Household not found");

  //   household.owner_id = new_owner_id;
  //   await household.save();
  //   return household;
  // }

  // // Delete by house number
  // async deleteByHouseNo(house_no: string): Promise<Household> {
  //   const household = await Household.findOne({ where: { house_no } });
  //   if (!household) throw new Error("Household not found");

  //   await household.destroy();
  //   return household;
  // }

}
