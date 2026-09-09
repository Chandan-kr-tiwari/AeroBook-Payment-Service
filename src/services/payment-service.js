const PaymentRepository = require('../repositories/payment-repository');
const { Enums } = require('../utils/common');

class PaymentService {
    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async createPayment(data) {
        const { bookingId } = data;

        // Get booking information from Booking Service
        const response = await fetch(
            `${process.env.AEROBOOK_BOOKING_SERVICE}/api/v1/bookings/${bookingId}`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch booking');
        }

        const bookingResponse = await response.json();

        const booking = bookingResponse.data;

        // Check whether booking is eligible for payment
        if (booking.status !== 'initiated') {
            throw new Error('Payment is not allowed for this booking');
        }

        // Check if payment already exists
        const existingPayment =
            await this.paymentRepository.findByBookingId(bookingId);

        if (existingPayment) {
            throw new Error('Payment already exists for this booking');
        }

        // Create payment
        const payment = await this.paymentRepository.create({
            bookingId: booking.id,
            userId: booking.userId,
            amount: booking.totalCost,
            status: Enums.PAYMENT_STATUS.INITIATED,
            provider: 'RAZORPAY'
        });

        return payment;
    }
}

module.exports = PaymentService;