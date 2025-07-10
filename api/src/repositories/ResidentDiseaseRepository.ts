import { Model } from "sequelize";
import Resident from "../models/resident";
import { ResidentDisease } from "../models/residentdisease";
import Disease from "../models/disease";

export class ResidentDiseaseRepository {
    async createResidentDisease(
        residentId: number,
        diseaseId: number
    ): Promise<ResidentDisease> {
        return ResidentDisease.create({
            id: 0,
            residentId,
            diseaseId,
        });
    }

    // This method retrieves all ResidentDisease entries from the database.
    async getAllResidentDiseases(): Promise<ResidentDisease[]> {
        try {
            return await ResidentDisease.findAll({
                attributes: ["id", "residentId", "diseaseId"],
                include: [
                    {
                        model: Resident,
                        as: "resident",
                        attributes: ["firstName", "lastName"],
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching resident diseases:", error);
            throw new Error("Unable to fetch resident diseases");
        }
    }

    //this is delete method by disease id
    async deleteResidentDiseaseByDiseaseId(diseaseId: number): Promise<void> {
        try {
            const result = await ResidentDisease.destroy({
                where: { diseaseId },
            });

            if (result === 0) {
                throw new Error("No resident disease found with the given disease ID");
            }
        } catch (error) {
            console.error("Error deleting resident disease by disease ID:", error);
            throw new Error("Unable to delete resident disease by disease ID");
        }
    }

    //this is delete method by resident id  
    async deleteResidentDiseaseByResidentId(residentId: number): Promise<void> {
        try {
            const result = await ResidentDisease.destroy({
                where: { residentId },
            });

            if (result === 0) {
                throw new Error("No resident disease found with the given resident ID");
            }
        } catch (error) {
            console.error("Error deleting resident disease by resident ID:", error);
            throw new Error("Unable to delete resident disease by resident ID");
        }
    }

    //updateResidentDiseaseBy residentId
    async updateResidentDiseaseByResidentId(
        residentId: number,
        diseaseId: number
    ): Promise<void> {
        try {
            const result = await ResidentDisease.update(
                { diseaseId },
                { where: { residentId } }
            );

            if (result[0] === 0) {
                throw new Error("No resident disease found with the given resident ID");
            }
        } catch (error) {
            console.error("Error updating resident disease by resident ID:", error);
            throw new Error("Unable to update resident disease by resident ID");
        }
    }

    //upateResidentDiseaseByDiseaseId
    async updateResidentDiseaseByDiseaseId(
        diseaseId: number,
        residentId: number
    ): Promise<void> {
        try {
            const result = await ResidentDisease.update(
                { residentId },
                { where: { diseaseId,residentId } }
            );

            if (result[0] === 0) {
                throw new Error("No resident disease found with the given disease ID");
            }
        } catch (error) {
            console.error("Error updating resident disease by disease ID:", error);
            throw new Error("Unable to update resident disease by disease ID");
        }
    }

    //this is method to get resident disease by resident i
    async getDiseasesByResidentId(
        residentId: number
    ): Promise<{ diseaseId: number; name: string }[]> {
        try {
            const residentDiseases = await ResidentDisease.findAll({
                where: { residentId },
                include: [
                    {
                        model: Disease,
                        as: "disease",
                        attributes: ["diseaseId", "diseaseName"],
                    },
                ],
            });

            // Extract only the disease data
            return residentDiseases
                .map((rd: any) => rd.disease ?? null)
                .filter(
                    (disease): disease is { diseaseId: number; name: string } => disease !== null
                );

        } catch (error) {
            console.error(
                "Error fetching resident diseases by resident ID:",
                error instanceof Error ? error.message : error
            );
            throw new Error("Unable to fetch resident diseases by resident ID");
        }
    }



    // This method retrieves all residents associated with a specific disease ID.
    async getResidentsByDiseaseId(diseaseId: number): Promise<{ id: number; firstName: string; lastName: string; contactNumber: string }[]> {
        try {
            const records = await ResidentDisease.findAll({
                where: { diseaseId },
                include: [
                    {
                        model: Resident,
                        as: "resident",
                        attributes: ["id", "firstName", "lastName", "contactNumber"],
                    },
                ],
            });
            // Extract only resident objects
            return records
                .map(rd => (rd as any).resident ?? null)
                .filter((res): res is { id: number; firstName: string; lastName: string; contactNumber: string } => res !== null);

        } catch (error) {
            console.error("Error fetching residents by disease ID:", error);
            throw new Error("Unable to fetch residents by disease ID");
        }




    }



}
