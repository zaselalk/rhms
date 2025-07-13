import { ResidentDiseaseRepository } from "../repositories/ResidentDiseaseRepository";
import { ResidentDiseaseService } from "../services/ResidentDiseaseService";
import { Request, Response } from "express";

export class ResidentDiseaseController {
    private residentDiseaseService: ResidentDiseaseService;

    constructor() {
        const residentDiseaseRepository = new ResidentDiseaseRepository();
        this.residentDiseaseService = new ResidentDiseaseService(residentDiseaseRepository);
    }

    //ping
    residentDiseasePing = async (req: Request, res: Response): Promise<Response> => {
        return res.json({

            message: "Resident Disease ping",
        });
    };


    // Register a resident with a disease
    createResidentDisease = async (req: Request, res: Response): Promise<Response> => {
        const { residentId, diseaseId } = req.body;
        console.log("Creating resident-disease association:", { residentId, diseaseId });
        if (!residentId || !diseaseId) {
            return res.status(400).json({
                message: "Missing residentId or diseaseId",
                status: 400,
                error: "Missing residentId or diseaseId",
                data: null,
            });
        }
        const residentDisease = await this.residentDiseaseService.createResidentDisease(residentId, diseaseId);
        if (!residentDisease) {
            return res.status(400).json({
                message: "Failed to create resident-disease association",
                status: 400,
                error: "Failed to create resident-disease association",
                data: null,
            });
        }
        return res.json({
            message: "Resident-Disease association created successfully",
            status: 200,
            error: null,
            data: residentDisease,
        });
    }


    // Get all resident-disease links
    getAllResidentDiseases = async (req: Request, res: Response): Promise<Response> => {
        try {
            const residentDiseases = await this.residentDiseaseService.getAllResidentDiseases();
            return res.json({
                message: "Resident-Disease associations fetched successfully",
                status: 200,
                error: null,
                data: residentDiseases,
            });
        } catch (error) {
            console.error("Error fetching resident-disease associations:", error);
            return res.status(500).json({
                message: "Error fetching resident-disease associations",
                status: 500,
                error: "Internal server error",
                data: null,
            });
        }
    };



    //Delete by diseaseid
    deleteResidentDiseaseByDiseaseId = async (req: Request, res: Response): Promise<Response> => {
        const { diseaseId } = req.body;
        console.log("Deleting resident disease by disease ID:", { diseaseId });

        if (!diseaseId) {
            return res.status(400).json({
                message: "diseaseId is required",
                status: 400,
                error: "Missing diseaseId in request body",
                data: null,
            });
        }

        try {
            const deletedCount = await this.residentDiseaseService.deleteByDiseaseId(diseaseId);

            return res.json({
                message: `Resident disease deleted successfully by disease ID`,
                status: 200,
                error: null,
                data: {
                    deletedCount,
                    diseaseId
                },
            });

        } catch (error) {
            console.error("Error deleting resident disease by disease ID:", error);
            return res.status(500).json({
                message: "Error deleting resident disease by disease ID",
                status: 500,
                error: error instanceof Error ? error.message : "Internal server error",
                data: null,
            });
        }
    }


    //Delete by residentid
    deleteResidentDiseaseByResidentId = async (req: Request, res: Response): Promise<Response> => {
        const { residentId } = req.body;
        console.log("Deleting resident disease by resident ID:", { residentId });
        try {
            await this.residentDiseaseService.deleteByResidentId(residentId);
            return res.json({
                message: "Resident disease deleted successfully by resident ID",
                status: 200,
                error: null,
                data: null,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error deleting resident disease by resident ID",
                status: 500,
                error: "Internal server error",
                data: null,
            });
        }
    }


    //get by resident id
    getDiseasesByResidentId = async (req: Request, res: Response): Promise<Response> => {
        const { residentId } = req.body;
        console.log("Fetching diseases for resident:", { residentId });
        try {
            const residentDiseases = await this.residentDiseaseService.getDiseasesByResidentId(residentId);
            return res.json({
                message: "Resident diseases fetched successfully",
                status: 200,
                error: null,
                data: residentDiseases,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching diseases by resident ID",
                status: 500,
                error: "Internal server error",
                data: null,
            });
        }
    }

    //get by disease id
    getResidentsByDiseaseId = async (req: Request, res: Response): Promise<Response> => {
        const { diseaseId } = req.body;
        console.log("Fetching residents for disease:", { diseaseId });
        try {
            const residents = await this.residentDiseaseService.getResidentsByDiseaseId(diseaseId);
            return res.json({
                message: "Residents fetched successfully",
                status: 200,
                error: null,
                data: residents,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching residents by disease ID",
                status: 500,
                error: "Internal server error",
                data: null,
            });
        }
    }

    // Get all diseases by disease name

    getDivisionCountsByDiseaseName = async (req: Request, res: Response): Promise<Response> => {
    const { diseaseName } = req.params;
    console.log("Fetching division counts for disease:", { diseaseName });
    if (!diseaseName) {
        return res.status(400).json({
            message: "diseaseName is required",
            status: 400,
            error: "Missing disease name",
            data: null
        });
    }

    try {
        const results = await this.residentDiseaseService.getDivisionCountsByDiseaseName(diseaseName);
        console.log("Sending result to frontend:", results); // Confirm response payload

        return res.json({
            message: "Division counts fetched successfully",
            status: 200,
            error: null,
            data: results
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching division counts",
            status: 500,
            error: "Internal Server Error",
            data: null
        });
    }
}
// Get disease counts by division ID
getDiseaseCountsByDivision = async (req: Request, res: Response): Promise<Response> => {
  try {
    const divisionId = Number(req.params.divisionId);
    if (isNaN(divisionId)) {
      return res.status(400).json({
        message: "Invalid divisionId parameter",
        status: 400,
        error: "divisionId must be a number",
        data: null,
      });
    }

    const diseaseCounts = await this.residentDiseaseService.getDiseaseCountsByDivision(divisionId);

    return res.json({
      message: "Disease counts fetched successfully",
      status: 200,
      error: null,
      data: diseaseCounts,
    });
  } catch (error) {
    console.error("Error fetching disease counts by division:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    });
  }
};



}
