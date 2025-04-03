
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


    
    


}


