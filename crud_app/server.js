const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parsing request to body parser
app.use(bodyparser.urlencoded({extended:true}))

//setting view engine
app.set("view engine", "pug")

//loading assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//loading routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})