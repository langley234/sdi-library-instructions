// app.js

//const knex = require('knex')(require('./knexfile.js'));
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
//console.log(process.env)


app.use(express.json());
app.use(cors());


/***********************************************************************************/
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });
  