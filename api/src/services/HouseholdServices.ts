
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
    houseid: number,
    password: string,
    houseowner: string,
    grama_division: string,
    income_range: number,
    location: string,
    familyMember: number
  ): Promise<Household> {
    const excitingHousehold = await this.householdRepository.findByHouseid(houseid);
    if (excitingHousehold) throw new HouseholdNotFoundException("Household ID already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.householdRepository.createHousehold(houseid, hashedPassword, houseowner, grama_division, income_range, location, familyMember);
  }

  async loginHousehold(houseid: number, password: string): Promise<Household> {
    const household = await this.householdRepository.findByHouseid(houseid);
    if (!household) throw new ValidationException("Invalid username or password");

    const isPasswordValid = await bcrypt.compare(password, household.password);

    //why - https://security.stackexchange.com/questions/17816/username-and-or-password-invalid-why-do-websites-show-this-kind-of-message-i
    if (!isPasswordValid) throw new Error("Invalid username or password");

    return household;
  }
}
