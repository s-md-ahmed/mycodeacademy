const express = require("express");
const path = require("path");
const app = express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Contactcode',{useNewUrlParser:true})
const port = 99;
// const bodyparser=require('body-parser');
//defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });
  const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory 
// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);//make a new contact object from request.body
    myData.save().then(()=>{//.save will save the data to the database and returns a promise that is why we use the .then() when the promise is resolved and .catch() when the promise is rejected
    res.send("<h1>This item has been saved to the database</h1>")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})
