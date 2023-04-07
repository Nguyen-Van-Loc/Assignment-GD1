const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Taikhoan');
const Schema = mongoose.Schema;
const sanpham = new Schema({
    tensp: { type: String, require: true },
    gia: { type: Number, require: true },
    mota: { type: String },
    image: { type: String }
}, { collection: 'sanpham' });
const SanphamModel = mongoose.model('sanpham', sanpham)
module.exports = SanphamModel




