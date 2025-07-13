import { Resident } from "../models/resident";

export class ResidentRepository {
  async createResident(
    firstName: string,
    lastName: string,
    nic: string,
    email: string,
    password: string,
    birthday: Date,
    bloodGroup: string,
    gender: string,
    bloodPressure: string,
    heartRate: string,
    address: string,
    contactNumber: string,
    divisionId: number,
    maritalState: string,
    educationLevel: string,
    addicted: Array<string>,
    alergies: Array<string>,
    chronicalDesease: Array<string>,
    height: number,
    weight: number
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
      attributes: [
        "id",
        "firstName",
        "lastName",
        "nic",
        "email",
        "birthday",
        "bloodGroup",
      ]
    });
  }

  //Find by id
  async findById(id: number): Promise<Resident | null> {
    return Resident.findOne({
      where: {
        id,
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "nic",
        "email",
        // 'password',
        "birthday",
        "bloodGroup",
        // 'gender',
        "bloodPressure",
        "heartRate",
        "address",
        "contactNumber",
        "divisionId",
        "maritalState",
        "educationLevel",
        "addicted",
        "alergies",
        "chronicalDesease",
        "height",
        "weight",
      ], // only fields necessary.
    });
  }

  async getAllResident(): Promise<Resident[] | null> {
    const residents = await Resident.findAll();
    return residents;
  }

  async updateResident(
    id: number,
    data: Partial<Resident>
  ): Promise<Resident | null> {
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

  async getResidentOverview(): Promise<Resident[] | null> {
    const residents = await Resident.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "nic",
        "contactNumber",
        "divisionId",
        "address",
      ],
    });
    return residents;
  }

  async getResidentCount(): Promise<number> {
    const count = await Resident.count();
    return count;
  }

  async countPatientsByDisease(): Promise<Record<string, number>> {
    const residents = await Resident.findAll({
      attributes: ["chronicalDesease"],
    });

    const diseaseCounts: Record<string, number> = {};

    for (const res of residents) {
      const rawValue = res.getDataValue("chronicalDesease");

      if (!rawValue || typeof rawValue !== "string") continue;

      let diseases: string[] = [];

      try {
        diseases = JSON.parse(rawValue);
      } catch (e) {
        console.warn(`Skipping invalid chronicalDesease value:`, rawValue);
        continue;
      }

      for (const disease of diseases) {
        if (!disease || disease.toLowerCase() === "none") continue;

        diseaseCounts[disease] = (diseaseCounts[disease] || 0) + 1;
      }
    }

    return diseaseCounts;
  }
  async findByEmail(email: string): Promise<Resident | null> {
    return Resident.findOne({
      where: {
        email,
      },
    });
  }

}
