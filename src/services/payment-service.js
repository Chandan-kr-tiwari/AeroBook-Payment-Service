const axios = require('axios');
const PaymentRepository = require('../repositories/payment-repository');
const { Enums } = require('../utils/common');
const { Razorpay } = require('../utils/helpers/razorpay');
const crypto = require('crypto');

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

        const razorpayOrder = await Razorpay.orders.create({
            amount: booking.totalCost * 100,
            currency: 'INR',
            receipt: `booking_${booking.id}`
        });

        const payment = await this.paymentRepository.create({
            bookingId: booking.id,
            userId: booking.userId,
            amount: booking.totalCost,
            status: Enums.PAYMENT_STATUS.INITIATED,
            provider: 'RAZORPAY',
            providerOrderId: razorpayOrder.id
        });

        return {
            payment,
            razorpayOrder
        };
    }

    async verifyPayment(data) {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = data;

        const payment =
            await this.paymentRepository.findByProviderOrderId(
                razorpay_order_id
            );

        if (!payment) {
            throw new Error('Payment not found');
        }

        const body =
            razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                'sha256',
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            throw new Error('Invalid payment signature');
        }

        // 1. Mark payment as successful
        await payment.update({
            providerPaymentId: razorpay_payment_id,
            status: Enums.PAYMENT_STATUS.SUCCESS
        });

        // 2. Confirm booking
        await axios.patch(
            `${process.env.AEROBOOK_BOOKING_SERVICE}/api/v1/bookings/${payment.bookingId}/confirm`
        );

        return payment;
    }
}

module.exports = PaymentService;