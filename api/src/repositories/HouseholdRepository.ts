import { Household } from "../models/hosehold";



export class HouseholdRepository {
  async createHousehold(
    houseid: number,
    password: string,
    houseowner: string,
    grama_division: string,
    income_range: number,
    location: string,
    familyMember: number
    
  ): Promise<Household> {
    return Household.create({
        houseid,
        password,
        houseowner,
        grama_division,
        income_range,
        location,
        familyMember
     
    });
  }

  
  async findByHouseid(houseId: number) /*: Promise<Household | null>*/ {
    console.log('househols model:',Household); // Debugging step
    if (!Household) {
      throw new Error("Household model is not defined");
    }

    return await Household.findOne({
      where: {
        houseid: houseId,
      },
    });
  }
}
