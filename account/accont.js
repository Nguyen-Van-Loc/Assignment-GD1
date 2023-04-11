const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Taikhoan');
var bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;
const account = new Schema({
    email: { type: String, unique: true, require: true },
    username: { type: String, require: true },
    password: { type: String },
    image: { type: String, },
    role:{ type :String}
    
}, { collection: 'account' });
account.pre("save", function (next) {
    var email = this;
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(email.password, salt, null, function (err, hash) {
          if (err) {
            return next(err);
          }
          email.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
  account.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
const AccountModel = mongoose.model('account', account)
module.exports = AccountModel

