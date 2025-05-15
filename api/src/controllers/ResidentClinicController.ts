import { ResidentClinic } from '../models/residentClinic';
import { ResidentClinicRepository } from '../repositories/ResidentClinicRepository';
import { ResidentClinicService } from '../services/ResidentClinicService';
import { Request, Response } from 'express';



class ResidentClinicController {
    private residentClinicService: ResidentClinicService;

    constructor() {
        const residentClinicRepository = new ResidentClinicRepository();
        this.residentClinicService = new ResidentClinicService(residentClinicRepository)
    }


    residentClinicPing = async (req: Request, res: Response): Promise<Response | void> => {
        return res.json({
            message: "Resident Clinic ping",
        });
    }

    registerClinic = async (req: Request, res: Response): Promise<Response | void> => {
        const {
            residentId,
            clinicId
        } = req.body;

        // Validate the request body
        if (!residentId || !clinicId) {
            return res.status(400).json({
                message: "Resident ID and Clinic ID are required",
                status: 400,
                error: "Resident ID and Clinic ID are required",
                data: null,
            });
        }

        // Check if the resident already has a clinic
        else if (isNaN(residentId) || isNaN(clinicId)) {
            const existingResidentClinic: ResidentClinic | null = await this.residentClinicService.findByResidentId(residentId);
            if (existingResidentClinic) {
                return res.status(400).json({
                    message: "Resident already has a clinic",
                    status: 400,
                    error: "Resident already has a clinic",
                    data: null,
                });
            }
            //Create the resident clinic
            else if (existingResidentClinic === null) {
                const residentClinic: ResidentClinic = await this.residentClinicService.createResidentClinic(residentId, clinicId);
                return res.json({
                    message: "Resident Clinic created successfully",
                    status: 200,
                    error: null,
                    data: residentClinic,
                });
            }
        }
    };

    getAllResidentClinics = async (req: Request, res: Response): Promise<Response | void> => {
        const residentClinics: ResidentClinic[] = await this.residentClinicService.getAllResidentClinics();
        if (!residentClinics) {
            return res.status(404).json({
                message: "No Resident Clinics found",
                status: 404,
                error: "No Resident Clinics found",
                data: null,
            });
        }
        return res.json({
            message: "Resident Clinics found successfully",
            status: 200,
            error: null,
            data: residentClinics,
        });
    };

    getResidentByClinicId = async (req: Request, res: Response): Promise<Response | void> => {
        const { id } = req.params;
        const residentClinic: ResidentClinic | null = await this.residentClinicService.findByClinicId(Number(id));
        if (!residentClinic) {
            return res.status(404).json({
                message: "Resident Clinic not found",
                status: 404,
                error: "Resident Clinic not found",
                data: null,
            });
        }
        return res.json({
            message: "Resident Clinic found successfully",
            status: 200,
            error: null,
            data: residentClinic,
        });
    };

}

export default ResidentClinicController;





