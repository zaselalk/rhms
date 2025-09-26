export interface ResidentData {
    firstName: string;
    lastName: string; 
    nic: string;
    email: string;
    password?: string;
    birthday: string;
    bloodGroup?: string;
    gender: string;
    address: string;
    contactNumber: string;
    divisionId: string;
    maritalState?: string;
    birthCertificateNumber?: string;
    religion?: string;
    educationLevel?: string;
    addicted?: string[];
    alergies?: string[];
    chronicalDesease?: string[];
    clinic?: string[];
    height?: number;
    weight?: number;
    Birthcertificate: string,
    jobdetail: string,
    glucose: Number,
    heartRate?: string;
    bloodPressure?: string;
    deletedAt: Date | null
    
  }
  