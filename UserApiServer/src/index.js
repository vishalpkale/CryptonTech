const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://vishalkale:vishalpkale@cluster0.ofyxk.mongodb.net/crypton", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);
console.log(process.env.PORT);
app.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT))
})