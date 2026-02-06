const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    Date: String, Ticker: String, Open: Number, High: Number, 
    Low: Number, Close: Number, Volume: Number, Daily_Return: Number
});
// Index để tìm kiếm nhanh hơn
stockSchema.index({ Ticker: 1, Date: -1 });

module.exports = mongoose.model('Stock', stockSchema);