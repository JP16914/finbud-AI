const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticker: { type: String, required: true },
    type: { type: String, enum: ['BUY', 'SELL', 'DEPOSIT'], required: true },
    quantity: { type: Number, default: 0 }, // 0 nếu là nạp tiền
    priceAtTransaction: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }, // Tổng tiền giao dịch
    status: { type: String, default: 'COMPLETED' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);