'use strict';

const { Model } = require('sequelize');
const {Enums} = require('../utils/common/enums')

const {INITIATED , SUCCESS , FAILED , REFUNDED} = Enums.PAYMENT_STATUS

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {

    static associate(models) {
      // No DB association with Booking.
      // Booking belongs to another microservice/database.
    }
  }

  Payment.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

        status: {
        type: DataTypes.ENUM,
        values:[INITIATED,SUCCESS,FAILED,REFUNDED],
        default:INITIATED,
         allowNull:false,
      },

      provider: {
        type: DataTypes.STRING,
        allowNull: false
      },

      providerOrderId: {
        type: DataTypes.STRING,
        allowNull: true
      },

      providerPaymentId: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Payment'
    }
  );

  return Payment;
};