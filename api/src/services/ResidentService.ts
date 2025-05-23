
import { Resident } from "../models/resident";
import { ResidentRepository } from "../repositories/ResidentRepository";
import bcrypt from "bcrypt";


interface Newesident {
    firstName: string,
    lastName: string,
    nic: string,
    email: string,
    password: string,
    birthday: Date,
    bloodGroup: string,
    gender: string,
    bloodPressure: string,
    heartRate: string,
    address: string,
    contactNumber: string,
    divisionId: number,
    maritalState: string,
    educationLevel: string,
    addicted: Array<string>,
    alergies: Array<string>,
    chronicalDesease: Array<string>,
    height: number,
    weight: number,
}

export class ResidentService {
    constructor(private residentRepository: ResidentRepository) { }

    async registerResident(

        firstName: string,
        lastName: string,
        nic: string,
        email: string,
        password: string,
        birthday: Date,
        bloodGroup: string,
        gender: string,
        bloodPressure: string,
        heartRate: string,
        address: string,
        contactNumber: string,
        divisionId: number,
        maritalState: string,
        educationLevel: string,
        addicted: Array<string>,
        alergies: Array<string>,
        chronicalDesease: Array<string>,
        height: number,
        weight: number,
    ): Promise<Resident> {

        // // Resident want id
        // const existingResident = await this.residentRepository.findById(id);
        // if (existingResident) throw new ValidationException("Resident already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Generated hash for '1234':", hashedPassword);


        return this.residentRepository.createResident(
            firstName,
            lastName,
            nic,
            email,
            hashedPassword,
            birthday,
            bloodGroup,
            gender,
            bloodPressure,
            heartRate,
            address,
            contactNumber,
            divisionId,
            maritalState,
            educationLevel,
            addicted,
            alergies,
            chronicalDesease,
            height,
            weight,
        );
    }

    async findByNic(nic: string): Promise<Resident | null> {
        const resident = this.residentRepository.findByNic(nic);
        if (!resident) throw new Error("Resident not found");
        return resident;
    }

    async findById(id: number): Promise<Resident | null> {
        const resident = this.residentRepository.findById(id);
        if (!resident) throw new Error("Resident not found");
        return resident;
    }

    async getAllResident(): Promise<Resident[] | null> {
        const resident = this.residentRepository.getAllResident();
        if (!resident) throw new Error("Resident not found");
        return resident;
    }

    async updateResident(id: number, data: Partial<Resident>): Promise<Resident | null> {
        const resident =  await this.residentRepository.updateResident(id, data);
        if (!resident) throw new Error("Resident not found");
        return resident;
    }

    async deleteResident(id: number): Promise<boolean> {
        const deleted = await this.residentRepository.deleteResident(id);
        return deleted;
    }
    
    async getResidentOverview(): Promise<Resident[] | null> {
        const resident = this.residentRepository.getResidentOverview();
        if (!resident) throw new Error("Resident not found");
        return resident;
    }

    async getResidentCount(): Promise<number> {
        const count = await this.residentRepository.getResidentCount();
        if (count === null) throw new Error("Resident not found");
        return count;
    }

    async getDiseasePatientCounts(): Promise<Record<string, number>> {
    return this.residentRepository.countPatientsByDisease();
  }

    async getDivisionPatientCounts(divisionId: number): Promise<number> {
        return this.residentRepository.getPatientCountByDivision(divisionId);
    }



  







}


