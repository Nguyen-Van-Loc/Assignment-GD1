const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Taikhoan');
const Schema = mongoose.Schema;
const sanpham = new Schema({
    tensp: String,
    gia:  Number,
    mota:  String,
    image: String
}, { collection: 'sanpham' });
const SanphamModel = mongoose.model('sanpham', sanpham)
module.exports = SanphamModel




