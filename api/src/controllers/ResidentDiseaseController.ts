import { ResidentDiseaseService } from "../services/ResidentDiseaseService";


export class ResidentDiseaseController {
    private residentDiseaseService: ResidentDiseaseService;
    
    constructor(residentDiseaseService: ResidentDiseaseService) {
        this.residentDiseaseService = residentDiseaseService;
    }
    
    // Register a resident with a disease
    async registerResidentDisease(
        residentId: number,
        diseaseId: number
    ): Promise<void> {
        return this.residentDiseaseService.registerResidentDisease(residentId, diseaseId);
    }
    
    // Get all resident-disease links
    async getAllResidentDiseases(): Promise<any[]> {
        return this.residentDiseaseService.getAllResidentDiseases();
    }
    
    // Update by residentId
    async updateResidentDiseaseByResidentId(
        diseaseId: number,
        residentId: number
    ): Promise<void> {
        return this.residentDiseaseService.updateResidentDiseaseByResidentId(diseaseId, residentId);
    }
    
    // Update by diseaseId
    async updateResidentDiseaseByDiseaseId(
        residentId: number,
        diseaseId: number
    ): Promise<void> {
        return this.residentDiseaseService.updateResidentDiseaseByDiseaseId(residentId, diseaseId);
    }
    
    // Delete by diseaseId
    async deleteByDiseaseId(diseaseId: number): Promise<void> {
        return this.residentDiseaseService.deleteByDiseaseId(diseaseId);
    }
    
    // Delete by residentId
    async deleteByResidentId(residentId: number): Promise<void> {
        return this.residentDiseaseService.deleteByResidentId(residentId);
    }

    // Get all diseases for a resident
    async getDiseasesByResidentId(residentId: number): Promise<any[]> {
        return this.residentDiseaseService.getDiseasesByResidentId(residentId);
    }

    // Get all residents for a disease
    async getResidentsByDiseaseId(diseaseId: number): Promise<any[]> {
        return this.residentDiseaseService.getResidentsByDiseaseId(diseaseId);
    }
    

    

}