const router = require('express').Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Stock = require('../models/Stock');
const verifyToken = require('../middleware/verifyToken');

// 1. MUA STOCK
router.post('/buy', verifyToken, async (req, res) => {
    try {
        const { ticker, quantity } = req.body;
        const userId = req.user.id;
        const upperTicker = ticker.toUpperCase();

        if (quantity <= 0) return res.status(400).json({ error: "Quantity invalid" });

        // Lấy giá hiện tại
        const stockInfo = await Stock.findOne({ Ticker: upperTicker }).sort({ Date: -1 });
        if (!stockInfo) return res.status(404).json({ error: "Stock not found" });
        const currentPrice = stockInfo.Close;
        const totalCost = currentPrice * quantity;

        const user = await User.findById(userId);
        if (user.balance < totalCost) return res.status(400).json({ error: "Insufficient balance" });

        // Logic Portfolio (Trung bình giá)
        const holding = user.portfolio.find(p => p.ticker === upperTicker);
        if (holding) {
            const newQty = holding.quantity + quantity;
            holding.averagePrice = ((holding.averagePrice * holding.quantity) + totalCost) / newQty;
            holding.quantity = newQty;
        } else {
            user.portfolio.push({ ticker: upperTicker, quantity, averagePrice: currentPrice });
        }

        user.balance -= totalCost;
        await user.save();

        // Lưu Transaction
        await new Transaction({
            userId, ticker: upperTicker, type: 'BUY', quantity, 
            priceAtTransaction: currentPrice, totalAmount: totalCost
        }).save();

        res.json({ message: `Bought ${quantity} ${upperTicker}`, newBalance: user.balance, portfolio: user.portfolio });
    } catch (err) { res.status(500).json({ error: "Trade failed" }); }
});

// 2. BÁN STOCK
router.post('/sell', verifyToken, async (req, res) => {
    try {
        const { ticker, quantity } = req.body;
        const userId = req.user.id;
        const upperTicker = ticker.toUpperCase();

        if (quantity <= 0) return res.status(400).json({ error: "Quantity invalid" });

        const stockInfo = await Stock.findOne({ Ticker: upperTicker }).sort({ Date: -1 });
        const currentPrice = stockInfo.Close;
        const totalRevenue = currentPrice * quantity;

        const user = await User.findById(userId);
        const stockIndex = user.portfolio.findIndex(p => p.ticker === upperTicker);
        
        if (stockIndex === -1) return res.status(400).json({ error: "You don't own this stock" });
        
        const holding = user.portfolio[stockIndex];
        if (holding.quantity < quantity) return res.status(400).json({ error: "Not enough shares" });

        holding.quantity -= quantity;
        if (holding.quantity === 0) user.portfolio.splice(stockIndex, 1); // Xóa nếu hết

        user.balance += totalRevenue;
        await user.save();

        await new Transaction({
            userId, ticker: upperTicker, type: 'SELL', quantity, 
            priceAtTransaction: currentPrice, totalAmount: totalRevenue
        }).save();

        res.json({ message: `Sold ${quantity} ${upperTicker}`, newBalance: user.balance, portfolio: user.portfolio });
    } catch (err) { res.status(500).json({ error: "Trade failed" }); }
});

// 3. LỊCH SỬ GIAO DỊCH
router.get('/history', verifyToken, async (req, res) => {
    const history = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
});

module.exports = router;