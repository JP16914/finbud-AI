const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction'); // Để lưu lịch sử nạp
const verifyToken = require('../middleware/verifyToken');
const { isValidLuhn, getCardBrand, isExpired } = require('../utils/cardValidator');

router.get('/', verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id).select('balance cards');
    res.json(user);
});

router.post('/add-card', verifyToken, async (req, res) => {
    try {
        const { cardNumber, cardHolder, expiryDate, cvv } = req.body;
        if (!isValidLuhn(cardNumber.replace(/\s/g, ''))) return res.status(400).json({ error: "Invalid Card" });
        if (isExpired(expiryDate)) return res.status(400).json({ error: "Card Expired" });

        const cleanNumber = cardNumber.replace(/\s/g, '');
        const brand = getCardBrand(cleanNumber);
        
        const user = await User.findById(req.user.id);
        if (user.cards.some(c => c.last4 === cleanNumber.slice(-4))) return res.status(400).json({ error: "Card Exists" });

        user.cards.push({
            cardHolder: cardHolder.toUpperCase(), encryptedNumber: cleanNumber,
            last4: cleanNumber.slice(-4), expiryDate, brand
        });
        await user.save();
        res.json({ message: "Card Added", brand });
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

router.post('/deposit', verifyToken, async (req, res) => {
    try {
        const { amount, cardId } = req.body;
        if (amount <= 0) return res.status(400).json({ error: "Invalid Amount" });

        const user = await User.findById(req.user.id);
        const card = user.cards.id(cardId);
        if (!card) return res.status(404).json({ error: "Card not found" });

        user.balance += amount;
        await user.save();

        // Lưu log nạp tiền
        await new Transaction({
            userId: user._id, ticker: 'USD', type: 'DEPOSIT', 
            totalAmount: amount, status: 'COMPLETED'
        }).save();

        res.json({ message: "Deposit Success", newBalance: user.balance });
    } catch (err) { res.status(500).json({ error: "Deposit Failed" }); }
});

module.exports = router;