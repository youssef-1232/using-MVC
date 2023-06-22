const express = require('express')
const mongoos = require('mongoose')
const helemt = require('helmet')
const bcrypt = require('bcrypt')
const path = require("path")
const http = require('http')
require("dotenv").config()
const app = express()
app.set("port", process.env.port)
const cors = require("cors")
const xss = require("xss-clean")

const datas = require('./model/dataschema')

const bodyParser = require("body-Parser");
const cookieparser = require("cookie-parser")
var session = require('express-session')
const ejs = require('ejs')

// console.log(process.env.port)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoos.connect("mongodb://0.0.0.0:27017/data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("concted")

}).catch((err) => {
    console.log(err)
})

app.use(helemt({
    contentSecurityPolicy: false,
    frameguard: false
}));
// app.use(express.static('public'));
// app.use(cors());
// app.use(xss());

// app.use(cookieparser());

// app.use(
//     session({
//         key: "user_sid",
//         secret: process.env.secret,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { expires: 1800000, },
//     }))

// app.use((req, res, next) => {
//     if (req.cookies.user_sid && req.session.user) {
//         res.clearCookie("user_sid");
//     }
//     next()
// })



app.set('template engine', 'ejs')
app.set('views', 'temp')
const datarouts = require('./routes/datarouts')
const { lstat } = require('fs')
app.use('/data', datarouts)

//http://localhost:4000/data/allData
//session checker

// let sessionchecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         next()

//     } else {
//         res.redirect('/login')
//     }

// }

//checker 2 for login
// let sessionchecker2 = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {

//         res.redirect('/')
//     } else {
//         next()
//     }

// }

//get login page
// app.get('/login', sessionchecker2, (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/login.html'))
// })


//login
// app.post('/login', async(req, res) => {

//     const std = await datas.findOne({ ph: req.body.ph }).exec()
//     if (std) {
//         const compar = await bcrypt.compare(req.body.password, std.password)
//         if (compar) {
//             req.session.user = std
//             res.redirect('/')
//         } else {
//             res.redirect('/login')
//         }
//     } else {
//         res.redirect('/reg')
//     }
// })


//get register page
// app.route('/reg')
//     .get(sessionchecker2, (req, res) => {
//         res.sendFile(path.join(__dirname, '/public/register.html'))
//     })
//     .post(async(req, res) => {
//         const myd = await datas.findOne({ ph: req.body.ph }).exec()
//         if (!myd) {
//             const newdata = await new datas({ name: req.body.name, ph: req.body.ph, grade: req.body.grade, password: req.body.password })
//             newdata.save().then(async() => {
//                 //   res.status(200).send("sucsess")
//                 res.redirect('/login')
//             })
//         } else {
//             res.redirect('/reg')
//         }
//     })



//create acount


// main after sucss login
// app.get('/', sessionchecker, (req, res) => {

//     if (req.session.user.ph = "012") {
//         res.sendFile(path.join(__dirname, '/public/main2.html'))
//     } else {
//         res.sendFile(path.join(__dirname, '/public/main.html'))
//     }

// })

//logout
// app.get('/logout', sessionchecker, (req, res) => {
//     res.clearCookie("user_sid");
//     res.redirect('/login')
// })

const httpserver = http.createServer(app)
httpserver.listen(app.get('port'), () => {
    console.log("server is runing")

})