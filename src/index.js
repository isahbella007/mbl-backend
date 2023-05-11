const express = require('express')
const router = require('./routes')
const cors = require('cors')

const app = express()
app.use(express.json())
// app.use(cors({ 
//     origin: "*", 
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials :  true,
// }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, auth-token'); // Include 'auth-token' header
  
    next();
  });
app.listen(3000, () => console.log('Server up and running'))
app.use('/api/mbl/', router)