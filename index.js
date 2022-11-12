require('dotenv').config();
const express =require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
// call Route

const caseRoutes = require('./routes/case.routes');
const userRoutes = require('./routes/user.routes');


connection();

app.use(express.json());
app.use(cors());

//use routes

app.use('/api/case/',caseRoutes);
app.use('/api/user/',userRoutes);


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

