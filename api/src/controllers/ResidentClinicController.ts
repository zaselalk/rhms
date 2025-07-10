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


    registerClinic = async (req: Request, res: Response): Promise<Response | void> => {
        const { residentId, clinicId } = req.body;

        // Validate required fields
        if (residentId === undefined || clinicId === undefined) {
            return res.status(400).json({
                message: "Resident ID and Clinic ID are required",
                status: 400,
                error: "Resident ID and Clinic ID are required",
                data: null,
            });
        }

        // Validate that both IDs are numbers
        if (isNaN(Number(residentId)) || isNaN(Number(clinicId))) {
            return res.status(400).json({
                message: "Resident ID and Clinic ID must be valid numbers",
                status: 400,
                error: "Invalid ID format",
                data: null,
            });
        }


        // Check if the resident-clinic pair already exists
        const existingResidentClinic = await this.residentClinicService.findByResidentIdAndClinicId(
            Number(residentId),
            Number(clinicId)
        );

        if (existingResidentClinic) {
            return res.status(400).json({
                message: "Resident already has a clinic",
                status: 400,
                error: "Resident already has a clinic",
                data: null,
            });
        }

        const residentClinic: ResidentClinic =
            await this.residentClinicService.createResidentClinic(
                Number(residentId),
                Number(clinicId)
            );

        return res.status(200).json({
            message: "Resident Clinic created successfully",
            status: 200,
            error: null,
            data: residentClinic,
        });

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

    getClinicsByResidentId = async (req: Request, res: Response): Promise<Response | void> => {
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

    
async getResidentsByClinicId(req: Request, res: Response) {
  const clinicId = Number(req.params.clinicId);
  const residents = await this.residentClinicService.getResidentsByClinicId(clinicId);
  res.status(200).json(residents);
}

    

}

export default ResidentClinicController;





