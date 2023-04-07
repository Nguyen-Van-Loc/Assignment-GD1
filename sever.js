const express = require('express')
const app = express();
const expressHbs = require('express-handlebars');
var router = require('./router.js')
var bodyParser = require('body-parser');
var AccountModel = require('./account/accont')
var SanphamModel = require('./account/sanpham')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash');
const multer = require('multer');
var methodOverride = require('method-override')
const { mongooestoObject,mutipleMongooesToObject } = require('./util/monggo.js');
const { helpers } = require('handlebars');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser(''))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}))

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image')
    },
    filename: function (req, file, cb) {
        let filename = file.originalname;
            arr = filename.split('.');
            let newFileName = '';
            for (let i = 0; i < arr.length; i++) {
                if (i != arr.length - 1) {
                    newFileName += arr[i];
                } else {
                    newFileName += ('-' + Date.now()+"1"+'.'+"png");
                }
            }
            cb(null, newFileName)
       
    }
})
var upload=multer({storage:Storage})
app.use(flash())
app.use('/public', express.static('public'))
app.use('/image', express.static('image'))
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "main", helpers: { sum: (a, b) => a + b }}))
app.set('view engine', '.hbs');
app.set('views', './');
app.use('/', router);
app.use(methodOverride('_method'))

app.post('/dangki',upload.single('anh'), (req, res) => {
    var image=  req.file.filename;
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
        } else if (pass !== pass1) {
            req.flash('message', 'Nhập lại mật khẩu không trùng khớp')
            res.redirect('/dangki')
        }
        else {
            AccountModel.insertMany({
                image:image,
                email: email,
                username: user,
                password: pass,
                repassword: pass1
            }).then(data => {
                res.redirect('/dangnhap')
            })
        }
    }).catch(err => {
        res.status(400).json('Tai khoan that bai')
    })
})
app.get('/trangchu', (req, res) => {
    res.render('trangchu')
})
app.get('/sanpham', (req, res) => {
    res.render('sanpham')
})
app.get('/dangnhap', (req, res) => {
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
app.get('/:id', async (req, res) => {
    try {
        const user = await AccountModel.findByIdAndDelete(req.params.id, req.body)
        if (!user) {
            res.status(404).send('ko co file')
        } else {
            res.status(200).redirect('/trangchu')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get("/:id/edit",upload.single('anh2'), async (req, res) => {
    AccountModel.findById(req.params.id).then(account => res.render('edit', { account: mongooestoObject(account) }))
});
app.put("/:id", async (req, res) => {
    // res.json(req.body)
    AccountModel.updateOne({ _id: req.params.id }, req.body).then(() => res.redirect('/trangchu'))
});
app.post('/themnguoidung',upload.single('anh1'), (req, res) => {   
    var image=  req.file.filename;
    var email = req.body.email;
    var user = req.body.username;
    var pass = req.body.password;
    var pass1 = req.body.repassword;
    AccountModel.insertMany({
        image:image,
        email: email,
        username: user,
        password: pass,
        repassword: pass1
    }).then(data => {
        res.redirect('/trangchu')
    })
})
app.post('/search',(req,res,next)=>{
    AccountModel.find({username:req.body.username}).then(account=>{res.render('trangchu',{account:mutipleMongooesToObject(account)})})
})
app.post('/themsanpham',upload.single('anhsp'),(req,res)=>{
    var image=  req.file.filename;
    var tensp = req.body.tensp;
    var gia = req.body.gia;
    var mota = req.body.mota;
    SanphamModel.insertMany({
        image:image,
        tensp: tensp,
        gia: gia,
        mota: mota,
    }).then(data => {
        res.redirect('/sanpham')
    })
})

app.listen(3000, () => {
    console.log(`Sever started on port`);
})