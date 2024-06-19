const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require("path");
const Userroutes=require("./routes/user");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use("",Userroutes);
app.use(express.static(path.join(__dirname, 'public')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', './build/index.html'));
});
mongoose.connect('mongodb://localhost:27017/ecom', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
