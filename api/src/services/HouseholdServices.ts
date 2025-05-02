
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

  //Read
  async getAllHouseholdsWithOwnerName(): Promise<any[]> {
    return this.householdRepository.getAllHouseholdsWithOwnerName();
  }
  
}
