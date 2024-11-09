const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan("tiny"));

//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "pug")
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
// app.use('/css/style.css', express.static(path.resolve(__dirname, "assets/css")))

app.get('/',(req, res) => {
    res.render('index');
})

app.get('/add-user',(req, res) => {
    res.render('add_user');
})

app.get('/update-user',(req,res) => {
    res.render('update_user');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})