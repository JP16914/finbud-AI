require('dotenv').config();
const mongoose = require('mongoose');
const Stock = require('./models/Stock');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB');
        
        // Kiểm tra mã AAPL
        const ticker = 'AAPL';
        
        // 1. Đếm tổng số bản ghi
        const count = await Stock.countDocuments({ Ticker: ticker });
        console.log(`\n📊 Tổng số dòng dữ liệu của ${ticker}: ${count}`);

        if (count === 0) {
            console.log('❌ Không tìm thấy dữ liệu AAPL! Kiểm tra lại tên Ticker hoặc Database.');
            process.exit();
        }

        // 2. Tìm ngày cũ nhất và mới nhất
        const first = await Stock.findOne({ Ticker: ticker }).sort({ Date: 1 });
        const last = await Stock.findOne({ Ticker: ticker }).sort({ Date: -1 });

        console.log(`📅 Ngày bắt đầu (Cũ nhất): ${first.Date}`);
        console.log(`📅 Ngày kết thúc (Mới nhất): ${last.Date}`);

        // 3. Kiểm tra xem có bị giới hạn khi query không
        // Giả lập query của Backend hiện tại
        const queryResult = await Stock.find({ Ticker: ticker }).sort({ Date: 1 }); // Không limit
        console.log(`🚀 Backend query (không limit) lấy được: ${queryResult.length} dòng`);

        process.exit();
    })
    .catch(err => console.error(err));