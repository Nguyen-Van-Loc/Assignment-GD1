var express = require('express')
var AccountModel1 = require('./account/khach')
var router = express.Router()
const {mutipleMongooesToObject}=require('./util/monggo')
router.get('/dangnhap', (req, res) => {
    res.render('dangnhap', {
        severErr: req.flash('message')
    })
})
router.get('/dangki', (req, res) => {
    res.render('dangki', {
        severErr: req.flash('message')
    })
})

router.get('/trangchu', (req, res, next) => {
    AccountModel1.find({}).then(khach => {
        res.render('trangchu', {khach:mutipleMongooesToObject(khach)})
    }).catch(next);
})
router.post('/themnguoidung',(req,res)=>{
    AccountModel1.findOne({}).sort({_id:'desc'})
    const count=new AccountModel1(req.body);
    count.save();
})
module.exports = router;