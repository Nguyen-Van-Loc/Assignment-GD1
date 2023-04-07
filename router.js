var express = require('express')
var AccountModel1 = require('./account/accont')
var SanphamModel1 = require('./account/sanpham')
var router = express.Router()
const {mutipleMongooesToObject}=require('./util/monggo')
router.get('/', (req, res) => {
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
router.get('/sanpham', (req, res, next) => {
    SanphamModel1.find({}).then(sanpham => {
        res.render('sanpham', {sanpham:mutipleMongooesToObject(sanpham)})
    }).catch(next);
})
module.exports = router;