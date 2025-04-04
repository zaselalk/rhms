import { ar } from "react-router/dist/development/route-data-H2S3hwhf";
import { Resident } from "../models/resident";
import { promises } from "dns";


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


    //Finf by nic
    async findByNic(nic: string): Promise<Resident | null> {
        return Resident.findOne({
            where: {
                nic,
            },
        });


    }

    //Find by id
    async findById(id: number): Promise<Resident | null> {
        return Resident.findOne({
            where: {
                id,
            },
        });
    }

    async getAllResident(): Promise<Resident[] | null> {
        const residents = await Resident.findAll();
        return residents;
    }


    async updateResident(id: number, data: Partial<Resident>): Promise<Resident | null> {
        const updatedRows = await Resident.update(data, {
            where: { id },
        });

        if (updatedRows[0] === 0) return null; // No record updated

        return Resident.findByPk(id); // Fetch updated resident
    }

    async deleteResident(id: number): Promise<boolean> {
        const deletedRows = await Resident.destroy({
            where: { id },
        });
        return deletedRows > 0;
    }






}
