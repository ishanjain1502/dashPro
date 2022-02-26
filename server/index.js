const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://ishanTest:ishn@cluster0.cenhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("lag gaya Db");
    }).catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const userRoute = require('./routes/UserRoutes');
const taskRoute = require('./routes/TaskRoutes');

app.use('/user', userRoute);
app.use('/task', taskRoute);

app.get('/', (req, res) => {
    res.send("Hello")
    console.log("hello");
})


app.listen(1337, function () {
    console.log('listening on port ' + 1337 + '!');
});