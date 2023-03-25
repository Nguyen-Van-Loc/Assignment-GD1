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
                res.redirect('/dangnhap')
            })

        }
    }).catch(err => {
        res.status(400).json('Tai khoan that bai')
    })

})
app.get('/trangchu',(req,res)=>{
    res.render('trangchu')
})
app.get('/dangnhap',(req,res)=>{
    res.render('dangnhap')
})
app.post('/dangnhap', (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    AccountModel.findOne({
        email: email,
        password: pass
    }).then(data => {
        if (data) {
            res.redirect('/trangchu')
        } else {
            req.flash('message', 'Đăng nhập thất bại')
            res.redirect('/dangnhap')
        }
    }).catch(err => {
        res.status(400).json('Có lỗi bên sever')
    })
})
app.get('/:id',async (req,res)=>{
    try {
        const user = await AccountModel.findByIdAndDelete(req.params.id,req.body)
        if(!user){
            res.status(404).send('ko co file')
        }else{
            res.status(200).redirect('/trangchu')
        }
    } catch (error) {
        res.status(500).send(err)
    }
})
app.get("/update/:id", async (req, res) => {
    try {
        const user = await AccountModel.findById(req.params.id);
        res.render('update', {
            viewTitle: "update user",
            username:user.username,
            email:user.email,
            password:user.password,
        });
    } catch (err) {
        console.log(err);
    }
});
app.post("/update/:id", async (req, res) => {
    AccountModel.updateOne({_id:req.body.id},req.body).then(()=>res.redirect('/trangchu'));
});

app.listen(3000, () => {
    console.log(`Sever started on port`);
})