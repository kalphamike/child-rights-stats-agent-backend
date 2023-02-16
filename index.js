require('dotenv').config();
const express =require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
// call Route

const caseRoutes = require('./routes/case.routes');
const userRoutes = require('./routes/user.routes');
const VictimeRoutes = require('./routes/victim.routes');
const mumuryangoRoutes = require('./routes/mumuryango.routes');
const reportRoutes = require('./routes/report.routes');


connection();

app.use(express.json());
app.use(cors());

//use routes

app.use('/api/case/',caseRoutes);
app.use('/api/user/',userRoutes);
app.use('/api/victim/',VictimeRoutes);
app.use('/api/mumuryango/', mumuryangoRoutes);
app.use('/api/report/',reportRoutes);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

