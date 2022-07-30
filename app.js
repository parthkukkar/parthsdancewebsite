const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var bodyParser = require('body-parser')
const port = 80;
const mongoose = require('mongoose');
const internal = require("stream");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactinfo');
}

const contactSchema = new mongoose.Schema({
    name: String,
    age : String,
    email:String,
    mobile:String
  });

  const contactd= mongoose.model('cinfo', contactSchema);




app.use('/static', express.static('static'))  //to serve static files
app.use(express.urlencoded()); 

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.get('/services', (req, res)=>{
    const params = {};
    res.status(200).render('Danceforms.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata = new contactd(req.body);
    mydata.save().then(()=>{res.send("this item is saved to database")}).catch(()=>{
        res.status(404).send("Not saved");
    })
    

})




app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});