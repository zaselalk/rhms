"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "permissions",
      [
        /**
         * User related permission
         */
        {
          permission: "user:view",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "user:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "user:edit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "user:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        /**
         * Disease related permission
         */
        {
          permission: "disease:view",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "disease:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "disease:edit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "disease:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        /**
         * Resident related permission
         */
        {
          permission: "resident:view",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "resident:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "resident:edit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "resident:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        /**
         * Role related permission
         */
        {
          permission: "role:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "role:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        /**
         * Dashboard related permission
         */
        {
          permission: "dashboard:view",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        /**
         * Household related permission
         */
        {
          permission: "household:view",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "household:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "household:edit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "household:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        /**
         * Clinic Related permission
         */
        {
          permission: "clinic:view",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "clinic:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "clinic:edit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "clinic:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        /**
         * Division related permission
         */

        {
          permission: "division:create",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: "division:delete",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("permissions", {}, {});
  },
};
