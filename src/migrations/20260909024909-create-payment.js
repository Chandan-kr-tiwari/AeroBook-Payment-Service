'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      bookingId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      status: {
        allowNull: false,
        type: Sequelize.ENUM(
          'INITIATED',
          'SUCCESS',
          'FAILED',
          'REFUNDED'
        )
      },

      provider: {
        allowNull: false,
        type: Sequelize.STRING
      },

      providerOrderId: {
        allowNull: true,
        type: Sequelize.STRING
      },

      providerPaymentId: {
        allowNull: true,
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};