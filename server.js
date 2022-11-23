const express = require('express');
const app = express();
const session = require('cookie-session');
const userController = require('./controllers/user');
const inventoryController = require('./controllers/inventory');
const db = require("./utils/db")

// Key for using session, random String
const KEY1 = "fiasigaiosgjpasjdfposdofjsaoindgiwgopmo"
const KEY2 = ".inoignisodfngiagpasdopfopnirgni4tj0294"

app.set('trust proxy', 1);

app.use(session({
  name: 'user-session',
  keys: [KEY1, KEY2]
}));

// Set View Engine. Please put API above this section.
app.set('view engine', 'ejs');

// API
app.post("/api/login", (req, res)=> {
  try {
    userController.handleAPILogin(req, res);
  }  catch (error) {console.log(error)}
});

app.get('/api/logout', (req, res)=> {
  if(req.session.username){
    req.session = null; 
    res.status(200).json({message:"Logged Out"});
  }else{
    res.status(404).json({message:"You have not logged in yet!"});
  }
});

// for api get inventory by name
app.get('/api/inventory/name/:name?', (req, res) => {
  try {
    inventoryController.getInvByName(req, res)
  } catch (error) {console.log(error) }
});

// for api get inventory by type
app.get('/api/inventory/type/:type?', (req, res) => {
  try{inventoryController.getInvByType(req,res)}
catch(error){console.log(error)}});



// View Route
app.get('/', (req, res) => {
  try{if (req.session.username) {
    res.redirect('/main');
  } else {
    res.render('index');
  }}
  catch(error){
    console.log(error);
  }
});

app.post('/', (req, res) => {
  try{if (req.session.username) {
    res.redirect('/main');
  }
  else {
    userController.handleLogin(req, res);
  }}
  catch(error){
    console.log(error)
  }
});

app.use('*', (req, res, next) => {
 try{if (req.session.username) {
    next()
  } else {
    req.session = null;
    res.redirect('/');
  }}
  catch(error){console.log(error)}
  
});

app.get("/main", (req, res) => {
try{inventoryController.handleGetMain(req, res);}
catch(error){console.log(error)}});
app.get("/create", (req, res) => {
  try{inventoryController.handleGetCreateinventory(req, res);}
  catch(error){console.log(error)}});
app.get("/show", (req, res) => {
  try{inventoryController.handleGetShowinventory(req, res);}
  catch(error){console.log(error)}});
app.get("/edit", (req, res) => {
  try{inventoryController.handleGetEdit(req, res);}
  catch(error){console.log(error)}});
app.get("/delete", (req, res) =>{
  try{ inventoryController.handleDelete(req, res);}
  catch(error){console.log(error)}});
app.post('/create', (req, res) => {
  try{ inventoryController.handleCreate(req, res);}
  catch(error){console.log(error)}});
app.post("/edit", (req, res) => {
  try{ inventoryController.handleEdit(req, res);}
catch(error){console.log(error)}});


app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});



db.mongodbConnect(() => {
  app.listen(process.env.PORT || 8099, () => {
    console.log(`GameDB listening on port ${process.env.PORT || 8099}!`);
  });
});