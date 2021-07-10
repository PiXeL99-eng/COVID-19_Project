const getJSON = require('get-json')
const express = require('express')
const app = express()
const { urlencoded } = require('body-parser');
const { response } = require('express');
const { default: fetch } = require('node-fetch');
const port = 3000


app.use(express.static("static"))
app.use(express.urlencoded({ extended: false }))
app.listen(process.env.PORT || 3000, function (e) {
    console.log("listening to port 3000");
})
app.set('view engine', 'ejs')



const d = new Date();
var date = d.getDate() ;
var month = d.getMonth() +1;
var year = d.getFullYear();


let array = [];

app.get('/', (req, res) => res.render("index"));
app.get('/search', (req, res) => res.render("search",{array:array}));
app.post('/search', function (req, res) {
    // console.log(req.body.search);
    getJSON(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${req.body.search}&date=${date}-${month}-${year}`, function (error, response) {

        console.log(response.sessions);
        let array = response.sessions;

        res.render("search", { array: array })
    });
})






