import { Request, Response } from 'express';
import { HouseholdServices } from '../services/HouseholdServices';
import { HouseholdRepository } from '../repositories/HouseholdRepository';

import Resident from '../models/resident';

export class HouseholdController {
  private householdService: HouseholdServices;

  constructor() {
    const householdRepository = new HouseholdRepository();
    this.householdService = new HouseholdServices(householdRepository);
  }

  createHousehold = async (req: Request, res: Response): Promise<Response> => {
    const { house_no, grama_division, longitude, latitude, owner_id } = req.body;
    const household = await this.householdService.registerHousehold(house_no, grama_division, longitude, latitude, owner_id);
    if (!household) {
      return res.status(400).json({ message: 'Failed to create household' });
    }
    return res.json(household);
  };

  getAllHouseholds = async (req: Request, res: Response): Promise<Response> => {
    try {
      const households = await this.householdService.getAllHouseholdsWithOwnerName();
      return res.json(households);
    } catch (error) {
      console.error('Error fetching households:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Update Household Owner
  updateHouseholdOwner = async (req: Request, res: Response): Promise<Response> => {
    const { house_no } = req.params;  // house_no as part of the request params
    const { owner_id } = req.body;

    if (!house_no || !owner_id) {
      return res.status(400).json({ message: 'Missing house_no or owner_id' });
    }

    try {
      const updated = await this.householdService.updateOwnerByHouseNo(house_no, owner_id);
      if (!updated) {
        return res.status(404).json({ message: 'Household not found' });
      }

      return res.json({ message: 'Household owner updated successfully', owner: updated });

    } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Delete Household by house_no
  deleteHousehold = async (req: Request, res: Response): Promise<Response> => {
    const { house_no } = req.params; // house_no as part of the request params

    if (!house_no) {
      return res.status(400).json({ message: 'Missing house_no' });
    }

    try {
      const deleted = await this.householdService.deleteHouseholdByHouseNo(house_no);
      if (!deleted) {
        return res.status(404).json({ message: 'Household not found' });
      }
      return res.json({ message: 'Household deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  gethouseholdCount = async (req: Request, res: Response): Promise<Response> => {
    try {
      const count = await this.householdService.householdCount();
      return res.json({
        message: 'Household count fetched successfully',
        status: 200,
        error: null,
        data: {count}
      });
    } catch (error) {
      console.error('Error fetching household count:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }




}
