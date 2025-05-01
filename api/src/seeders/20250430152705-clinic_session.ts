import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert('sessions', [
      {
        sessionId: 1,
        clinicId: 1,
        name: 'Morning Checkup',
        sessionDate: '2025-05-01',
      },
      {
        sessionId: 2,
        clinicId: 2,
        name: 'Evening Consultation',
        sessionDate: '2025-05-02',
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('sessions', {}, {});
  },
};
