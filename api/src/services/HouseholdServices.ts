import { HouseholdNotFoundException } from "../exceptions/HouseholdNotFound";
import Household from "../models/hosehold";

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
    return this.householdRepository.createHousehold(house_no, grama_division, longitude, latitude, owner_id);
  }

  // Read
  async getAllHouseholdsWithOwnerName(): Promise<any[]> {
    return this.householdRepository.getAllHouseholdsWithOwnerName();
  }

  // Update Household Owner by house_no
  async updateOwnerByHouseNo(house_no: string, owner_id: number): Promise<boolean> {
    return this.householdRepository.updateOwnerByHouseNo(house_no, owner_id);
  }

  // Delete Household by house_no
  async deleteHouseholdByHouseNo(house_no: string): Promise<boolean> {
    const household = await this.householdRepository.findHouseholdByHouseNo(house_no);
    if (!household) {
      throw new HouseholdNotFoundException("Household not found");
    }
    return this.householdRepository.deleteHouseholdByHouseNo(house_no);
  }
}
