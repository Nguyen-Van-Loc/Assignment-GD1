const express = require('express')
const app = express();
const expressHbs = require('express-handlebars');

app.use(express.static('public/image'))
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "main" }))
app.set('view engine', '.hbs');
app.set('views', './');

app.get("/", function (req, res) {
    res.render('dangnhap')
})


app.listen(3000, () => {
    console.log(`Sever started on port`);
})