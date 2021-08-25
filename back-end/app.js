const PORT = process.env.PORT || 3001;
let conn = {
    host : 'pg-database',
    port : '5432',
    user : 'postgres',
    password : 'docker'
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//console.log(app);
var knex = require('knex')({ client: 'pg', connection: conn });

conn.database = 'library';

var knex = require('knex')({ client: 'pg', connection: conn });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(`Get Request Received`);
});

app.get('/api/books', (req, res) => {
  knex.raw(`SELECT * FROM library_books`)
    .then((result) => {
      if (result.rows <= 0) {
        res.status(404).send(`No Data Available`);
      } else {
        res.status(200).json(result.rows);
      }
    });
});
/***********************************************************************************/
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });
  