const router = require('express').Router();
const Stock = require('../models/Stock');

// --- 1. GET MARKET SUMMARY (Cho Dashboard & Market Table) ---
// API: GET /api/stocks
// Chức năng: Lấy danh sách tất cả các mã cổ phiếu và giá mới nhất của chúng.
router.get('/', async (req, res) => {
    try {
        // Lấy danh sách các mã Ticker duy nhất (vd: ['AAPL', 'GOOGL', 'TSLA'])
        const tickers = await Stock.distinct('Ticker');
        const summary = {};

        // Lặp qua từng mã để tìm bản ghi mới nhất (theo ngày)
        for (const ticker of tickers) {
            // sort({ Date: -1 }) nghĩa là lấy ngày mới nhất
            const latestData = await Stock.findOne({ Ticker: ticker }).sort({ Date: -1 });
            
            if (latestData) {
                summary[ticker] = latestData;
            }
        }
        
        // Trả về object dạng: { "AAPL": { ...data }, "GOOGL": { ...data } }
        res.json(summary);
    } catch (err) {
        console.error("Error fetching market summary:", err);
        res.status(500).json({ error: "Failed to fetch market data" });
    }
});

// --- 2. GET STOCK HISTORY (Cho Biểu đồ Chart) ---
// API: GET /api/stocks/:ticker (vd: /api/stocks/AAPL)
// Chức năng: Lấy lịch sử giá của 1 mã cụ thể để vẽ biểu đồ.
router.get('/:ticker', async (req, res) => {
    try {
        const ticker = req.params.ticker.toUpperCase(); // Chuyển thành chữ hoa (aapl -> AAPL)
        
        // Lấy dữ liệu, sắp xếp Date: 1 (Tăng dần: Cũ -> Mới) để vẽ biểu đồ từ trái qua phải
        // .limit(365) để lấy dữ liệu 1 năm gần nhất (tránh lấy quá nhiều làm lag app)
        const history = await Stock.find({ Ticker: ticker })
                                   .sort({ Date: 1 }) 
                                   .limit(365);

        if (history.length === 0) {
            return res.status(404).json({ error: "Stock ticker not found" });
        }

        res.json(history);
    } catch (err) {
        console.error(`Error fetching history for ${req.params.ticker}:`, err);
        res.status(500).json({ error: "Failed to fetch stock history" });
    }
});

module.exports = router;