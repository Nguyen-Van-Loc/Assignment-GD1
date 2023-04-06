const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Taikhoan');
const Schema = mongoose.Schema;
const account = new Schema({
    email: { type: String, unique: true, require: true },
    username: { type: String, },
    password: { type: String },
    repassword: { type: String},
    image: { type: String }
}, { collection: 'account' });
const AccountModel = mongoose.model('account', account)
module.exports = AccountModel

