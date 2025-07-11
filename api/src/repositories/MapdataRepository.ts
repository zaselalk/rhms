import Household from "../models/household";
import Resident from "../models/resident";



export class MapdataRepository {

    async getAllHoouseLocation(): Promise<any[]> {
        return await Household.findAll({
            attributes: ["house_no", "grama_division", "longitude", "latitude", "owner_id"],
            include: [
                {
                    model: Resident,
                    as: "owner", 
                    attributes: ["firstName", "lastName"], 
                },
            ],
        })

    }
}

