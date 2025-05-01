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

  //read data
  
  async getAllHouseholdsWithOwnerName(): Promise<any[]> {
    return await Household.findAll({
      attributes: ["house_no", "owner_id", "grama_division"],
      include: [
        {
          model: Resident,
          as: "owner", // match the alias used in the association
          attributes: ["name"], // only include resident name
        },
      ],
    });
  }

}
