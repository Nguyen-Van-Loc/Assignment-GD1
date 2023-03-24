const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Taikhoan');
const Schema = mongoose.Schema;
const account = new Schema({
    email:{ type:String,unique:true,require:true},
    username:{ type:String,unique:true,require:true},
    password: { type:String,unique:true,require:true},
    repassword: { type:String,unique:true,require:true}
}, { collection: 'account' });
const AccountModel = mongoose.model('account', account)
module.exports = AccountModel

