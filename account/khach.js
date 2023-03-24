const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Taikhoan');
const Schema = mongoose.Schema;
const khach = new Schema({
    _id: { type: Number },
    id: { type: String, unique: true, require: true },
    name: { type: String, unique: true, require: true },
    birt: { type: String, unique: true, require: true },
    address: { type: String, unique: true, require: true }
}, { collection: 'khach', _id: false });
const AccountModel = mongoose.model('khach', khach)
module.exports = AccountModel