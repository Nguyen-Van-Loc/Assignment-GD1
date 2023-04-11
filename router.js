var express = require('express')
var AccountModel = require('./account/accont')
var SanphamModel = require('./account/sanpham')
var router = express.Router()
var jwt = require('jsonwebtoken');

const {mutipleMongooesToObject}=require('./util/monggo')
router.get('/dangnhap', (req, res)=> {
    res.render('dangnhap', {
        severErr: req.flash('message1')
    })
})
router.get('/dangki', (req, res) => {
    res.render('dangki', {
        severErr: req.flash('message')
    })
})
var checkLogin =(req,res,next)=>{
    try {
        var token=req.cookies.token;
        var idUser=jwt.verify(token,"nit");
        console.log(idUser.role)
        AccountModel.findOne({
            _id:idUser  
        }).then(data=>{
            if (data) {
                req.data=data;
                next();
            }
            else{
                res.json("Loi loi")
            }
        }).catch(err=>{

        })
       
    } catch (error) {
       res.status(500).json('Vui long dang nhap')
    }
}
module.exports=checkLogin;

router.get('/trangchu',checkLogin, async function (req, res, next){
//     try {
//         var token=req.cookies.token;
//         var kq=jwt.verify(token,"nit")
//         if (kq) {
//             next()
//         }
//     } catch (error) {
//         res.redirect("dangnhap")
//     }
// },(req,res,next)=>{
    AccountModel.find({}).then(account => {
        res.render('trangchu',{check:req.data.role=='admin',data:req.data._id,username:req.data.username,account:mutipleMongooesToObject(account)})
    })
})
router.get('/sanpham',checkLogin, (req, res, next) => {
    SanphamModel.find({}).then(sanpham => {
        res.render('sanpham', {check:req.data.role=='admin',data:req.data._id,username:req.data.username,sanpham:mutipleMongooesToObject(sanpham)})
    }).catch(next);
})
router.get('/logout',checkLogin,(req,res)=>{
    res.clearCookie('token')
    res.redirect('/dangnhap')
})
module.exports = router;