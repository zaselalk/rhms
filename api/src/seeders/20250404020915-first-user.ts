"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Chandana",
        email: "chandana@gmail.com",
        password:
          "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    // remove the first user
    await queryInterface.bulkDelete("users", {
      email: "chandana@gmail.com",
    });
  },
};
