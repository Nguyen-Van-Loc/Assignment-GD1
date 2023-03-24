const express = require('express')
const app = express();
const expressHbs = require('express-handlebars');
var router = require('./router.js')
var bodyParser = require('body-parser');
var AccountModel = require('./account/accont')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash');
const multer  = require('multer')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(''))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge:60000 }
  }))
  app.use(flash())
app.use('/public', express.static('public'))
app.use('/image', express.static('image'))
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "main" }))
app.set('view engine', '.hbs');
app.set('views', './');
app.use('/', router);
app.post('/dangki',  (req, res) => {
    var email = req.body.email;
    var user = req.body.username;
    var pass = req.body.password;
    var pass1 = req.body.repassword;
    AccountModel.findOne({
        email: email
    }).then(data => {
        if (data) {
            req.flash('message', 'Tài khoản đã tồn tại')
            res.redirect('/dangki')
        }else if(pass!==pass1){
            req.flash('message', 'Nhập lại mật khẩu không trùng khớp')
            res.redirect('/dangki')
        }
        else {
            AccountModel.create({
                email: email,
                username: user,
                password: pass,
                repassword:pass1
            }).then(data => {
                res.render('dangnhap')
            })

        }
    }).catch(err => {
        res.status(400).json('Tai khoan that bai')
    })

})
app.post('/dangnhap', (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    AccountModel.findOne({
        email: email,
        password: pass
    }).then(data => {
        if (data) {
            res.render('trangchu')
        } else {
            req.flash('message', 'Đăng nhập thất bại')
            res.redirect('/dangnhap')
        }
    }).catch(err => {
        res.status(400).json('Có lỗi bên sever')
    })
})
app.listen(3000, () => {
    console.log(`Sever started on port`);
})