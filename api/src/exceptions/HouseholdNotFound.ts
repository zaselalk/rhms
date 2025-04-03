export class HouseholdNotFoundException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "HouseholdNotFoundException";
    }
  }
  