var express = require('express')
var AccountModel1 = require('./account/accont')
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
    AccountModel1.find({}).then(account => {
        res.render('trangchu', {account:mutipleMongooesToObject(account)})
    }).catch(next);
})
router.post('/themnguoidung',(req,res)=>{
    const formData=req.body;
   
})
module.exports = router;