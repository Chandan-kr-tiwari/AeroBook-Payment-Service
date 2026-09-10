const { StatusCodes } = require('http-status-codes');
const PaymentService = require('../services/payment-service');

const paymentService = new PaymentService()

async function createPayment(req, res) {
    try {
        const response = await paymentService.createPayment({
            bookingId: req.body.bookingId
        });

        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'Payment initiated successfully',
                data: response
            });

    } catch (error) {
        console.log('PAYMENT CONTROLLER ERROR:', error.message);

        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: error.message,
                data: {}
            });
    }
}

async function verifyPayment(req, res) {
    console.log("🔥 VERIFY PAYMENT ROUTE HIT");
    console.log("VERIFY BODY:", req.body);

    try {
        const response = await paymentService.verifyPayment(req.body);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Payment verified successfully',
            data: response
        });

    } catch (error) {
        console.log('PAYMENT VERIFICATION ERROR:', error.message);

        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
}

module.exports = {
    createPayment,
    verifyPayment
};