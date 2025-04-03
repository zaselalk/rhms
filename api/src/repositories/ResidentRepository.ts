import { ar } from "react-router/dist/development/route-data-H2S3hwhf";
import { Resident } from "../models/resident";


export class ResidentRepository {
    async createResident(
firstName: string, lastName: string, nic: string, email: string, password: string, birthday: Date, bloodGroup: string, gender: string, bloodPressure: string, heartRate: string, address: string, contactNumber: string, divisionId: number, maritalState: string, educationLevel: string, addicted: Array<string>, alergies: Array<string>, chronicalDesease: Array<string>, height: number, weight: number,
    ): Promise<Resident> {
        return Resident.create({
            firstName,
            lastName,
            nic,
            email,
            password,
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
        });
    }
}
