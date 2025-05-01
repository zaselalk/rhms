
import { HouseholdNotFoundException } from "../exceptions/HouseholdNotFound";
import { ValidationException } from "../exceptions/ValidatationError";
import { Household } from "../models/hosehold";
import bcrypt from "bcrypt";
import { HouseholdRepository } from "../repositories/HouseholdRepository";




export class HouseholdServices {
  private householdRepository: HouseholdRepository;

  constructor(householdRepository: HouseholdRepository) {
    this.householdRepository = householdRepository;
  }

  async registerHousehold(
    house_no: string,
    grama_division: string,
    longitude: string,
    latitude: string,
    owner_id?: number

  ): Promise<Household> {
    // const excitingHousehold = await this.householdRepository.findByHouseno(house_no);
    // if (excitingHousehold) throw new HouseholdNotFoundException("Household ID already in use");

   
    return this.householdRepository.createHousehold(house_no, grama_division, longitude, latitude, owner_id);
  }

  // // READ
  // async getHouseholdDetails(id: number): Promise<{ house_no: string; grama_division: string; owner_name: string }> {
  //   const household = await this.householdRepository.findById(id);
  //   if (!household) {
  //     throw new HouseholdNotFoundException(`Household with ID ${id} not found.`);
  //   }
    
  //   return {
  //     house_no: household.house_no,
  //     grama_division: household.grama_division,
  //     owner_name: household.resident.name,
  //   };
  // }

  // // UPDATE OWNER
  // async updateOwner(id: number, new_owner_id: number): Promise<Household> {
  //   const household = await this.householdRepository.findById(id);
  //   if (!household) {
  //     throw new HouseholdNotFoundException(`Household with ID ${id} not found.`);
  //   }

  //   return this.householdRepository.updateOwner(id, new_owner_id);
  // }

  // // DELETE
  // async deleteHousehold(house_no: string): Promise<Household> {
  //   const existing = await this.householdRepository.findByHouseno(house_no);
  //   if (!existing) {
  //     throw new HouseholdNotFoundException(`No household found with house number ${house_no}`);
  //   }

  //   return this.householdRepository.deleteByHouseNo(house_no);
  // }

}
