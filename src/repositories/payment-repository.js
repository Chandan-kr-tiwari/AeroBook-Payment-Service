const CrudRepository = require('./crud-repository');
const { Payment } = require('../models');

class PaymentRepository extends CrudRepository {
    constructor() {
        super(Payment);
    }

    async findByBookingId(bookingId) {
        return await this.model.findOne({
            where: {
                bookingId
            }
        });
    }

    async findByProviderOrderId(providerOrderId) {
        return await this.model.findOne({
            where: {
                providerOrderId
            }
        });
    }

    async findByProviderPaymentId(providerPaymentId) {
        return await this.model.findOne({
            where: {
                providerPaymentId
            }
        });
    }
}

module.exports = PaymentRepository;