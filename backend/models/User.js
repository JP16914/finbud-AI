const mongoose = require('mongoose');

// Schema Thẻ Ngân Hàng
const cardSchema = new mongoose.Schema({
    cardHolder: { type: String, required: true },
    encryptedNumber: { type: String, required: true },
    last4: { type: String, required: true },
    expiryDate: { type: String, required: true },
    brand: { type: String },
    cardType: { type: String, default: 'Credit' },
    bankName: { type: String, default: 'Unknown Bank' }
});

// Schema Danh Mục Đầu Tư (Portfolio)
const holdingSchema = new mongoose.Schema({
    ticker: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    averagePrice: { type: Number, required: true } // Giá trung bình mua vào
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    authType: { type: String, default: 'local' },
    avatar: String,
    
    // --- FINANCE FIELDS ---
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    balance: { type: Number, default: 0 }, // Tiền mặt
    cards: [cardSchema], // Danh sách thẻ
    portfolio: [holdingSchema] // Danh sách cổ phiếu đang giữ
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);