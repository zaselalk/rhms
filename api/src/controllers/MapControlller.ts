import { Request, Response } from 'express';
import { HouseholdServices } from '../services/HouseholdServices';
import { HouseholdRepository } from '../repositories/HouseholdRepository';
import { MapdataService } from '../services/MapdataService';
import { MapdataRepository } from '../repositories/MapdataRepository';

export class MapController {
    private householdService: HouseholdServices;
    private mapDataService:MapdataService;

    constructor() {
        const householdRepository = new HouseholdRepository();
        this.householdService = new HouseholdServices(householdRepository);

        const mapdataRepository = new MapdataRepository();
        this.mapDataService = new MapdataService(mapdataRepository);
    }

    // Ping endpoint for testing
    mapPing = async (req: Request, res: Response): Promise<Response> => {
        return res.json({
            message: "Map ping",
        });
    };


    getAllHouseLocations = async (req: Request, res: Response): Promise<Response> => {
        try{
            const households = await this.mapDataService.getAllHouseLocations();
            return res.json({
                message: "Map data fetched successfully",
                status: 200,
                error: null,
                data: households,
            });
        }catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                status: 500,
                error: error instanceof Error ? error.message : 'Unknown error',
                data: null,
            });
        }
    };
}