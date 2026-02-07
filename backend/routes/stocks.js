const router = require('express').Router();
const Stock = require('../models/Stock');

// --- HÀM HELPER: Gom nhóm dữ liệu theo tháng (Dùng cho nút ALL) ---
// Giải thích: Hàm này giúp giảm tải cho Frontend. Thay vì gửi 2500 điểm, 
// ta tính trung bình mỗi tháng 1 điểm -> Chỉ còn khoảng 120 điểm.
const processGroupedData = (data) => {
    if (!data || data.length === 0) return [];

    const grouped = {};
    
    data.forEach(item => {
        // Cắt chuỗi ngày để lấy Tháng (YYYY-MM) làm key
        // Ví dụ: "2016-02-23" -> "2016-02"
        const monthKey = item.Date.substring(0, 7);
        
        if (!grouped[monthKey]) grouped[monthKey] = [];
        grouped[monthKey].push(item.Close);
    });

    // Tính trung bình cộng
    return Object.keys(grouped).sort().map(key => {
        const prices = grouped[key];
        const avg = prices.reduce((sum, val) => sum + val, 0) / prices.length;
        return { Date: key, Close: parseFloat(avg.toFixed(2)) };
    });
};

// --- API LẤY DỮ LIỆU ---
router.get('/:ticker', async (req, res) => {
    try {
        const ticker = req.params.ticker.toUpperCase();
        // Mặc định là '1Y' nếu không gửi gì lên
        const period = req.query.period || '1Y'; 

        console.log(`📡 API Called: ${ticker} | Period: ${period}`);

        // 1. Xây dựng bộ lọc ngày
        let dateQuery = {};
        
        if (period !== 'ALL') {
            const startDate = new Date();
            if (period === '1W') startDate.setDate(startDate.getDate() - 7);
            if (period === '1M') startDate.setMonth(startDate.getMonth() - 1);
            // Quan trọng: Nếu là 1Y, lấy từ 1 năm trước đến nay
            if (period === '1Y') startDate.setFullYear(startDate.getFullYear() - 1);
            
            // Query lấy những ngày LỚN HƠN ngày bắt đầu
            dateQuery = { 
                Date: { $gte: startDate.toISOString().split('T')[0] } 
            };
        }

        // 2. Truy vấn Database (CORE CODE)
        // - find({ Ticker, ...dateQuery }): Tìm đúng mã và đúng khoảng ngày
        // - sort({ Date: 1 }): Sắp xếp Cũ trước -> Mới sau (để vẽ biểu đồ từ trái qua phải)
        // - lean(): Giúp query nhanh hơn, trả về object thuần JSON
        const stocks = await Stock.find({ Ticker: ticker, ...dateQuery })
                                  .sort({ Date: 1 }) 
                                  .lean();

        console.log(`✅ Found: ${stocks.length} rows`);

        if (stocks.length === 0) return res.json([]);

        // 3. Xử lý dữ liệu trả về
        if (period === 'ALL') {
            // Nếu chọn ALL -> Gom nhóm theo tháng cho nhẹ
            const groupedData = processGroupedData(stocks);
            return res.json(groupedData);
        }

        // Nếu là 1W, 1M, 1Y -> Trả về chi tiết từng ngày
        res.json(stocks);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

// API Summary cho Market Page (Giữ nguyên)
router.get('/', async (req, res) => {
    try {
        const tickers = await Stock.distinct('Ticker');
        const summary = {};
        for (const t of tickers) {
            const latest = await Stock.findOne({ Ticker: t }).sort({ Date: -1 });
            if (latest) summary[t] = latest;
        }
        res.json(summary);
    } catch (err) { res.status(500).json({ error: "Error" }); }
});

module.exports = router;