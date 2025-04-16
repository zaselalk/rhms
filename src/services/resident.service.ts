class ResidentService {
    // Add Resident
    async addResident(newResidentData: any) {
        const response = await fetch("http://localhost:3001/resident/createResident", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newResidentData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Unable to add resident");
        }

        const data = await response.json();

        // Check if the response contains a success message    
        return data;
    }
}

export default new ResidentService();