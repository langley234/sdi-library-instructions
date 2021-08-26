const PORT = process.env.PORT || 3001;
let conn = {
    host : '127.0.0.1',
    //host : 'pg-database',
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

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username === undefined || typeof username !== 'string' ||
    password === undefined || typeof password !== 'string') {
    res.status(400).send(`Invalid Data Received for POST request`);
  } else {
    knex.raw(`SELECT * FROM library_users WHERE username = '${username}' AND password = '${password}'`)
      .then((result) => {
        if (result.rows.length < 1) {
          res.status(404).send(`No user with that username and password exists`);
        } else {
          res.status(200).json(result.rows);
        }
      })
  }
});

app.post('/login/create-account', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;

  if (firstName === undefined || typeof firstName !== 'string' ||
    lastName === undefined || typeof lastName !== 'string' ||
    username === undefined || typeof username !== 'string' ||
    password === undefined || typeof password !== 'string') {
    res.status(400).send(`Invalid Data Received for POST request`);
  } else {
    knex.raw(`SELECT * FROM library_users WHERE username = '${username}'`)
      .then((result) => {
        console.log(result);
        if (result.rows.length !== 0) {
          res.status(409).send(`Username Already Exists`);
        } else {
          knex.raw(`INSERT INTO library_users (first_name, last_name, username, password) VALUES ('${firstName}', '${lastName}', '${username}', '${password}')`)
            .then((result) => {
              if (result.rowCount === 1) {
                knex.raw(`SELECT * FROM library_users WHERE username = '${username}'`)
                  .then((result) => {
                    if (result.rows.length < 1) {
                      res.status(404).send(`Could not retrieve created user`);
                    } else {
                      res.status(201).json(result.rows);
                    }
                  })
              } else {
                res.status(418).send(`Error Adding Account to Database`);
              }
            })
        }
      })
  }
});

app.post('/api/books/:bookID/checkout/:userID', (req, res) => {
  let bookID = parseInt(req.params.bookID);
  let userID = parseInt(req.params.userID);

  if (bookID === undefined || typeof bookID !== 'number' || userID === undefined || typeof userID !== 'number') {
    res.status(400).send(`Invalid Data Received for Request`);
  } else {
    knex.raw(`UPDATE library_books SET book_checked_out = true WHERE book_id = ${bookID}`)
      .then((result) => {
        if (result.rowCount < 1) {
          res.status(418).send(`Unable to Update database`);
        } else {
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
          const dateObj = new Date();
          let returnDate = new Date();
          returnDate.setUTCDate(returnDate.getUTCDate() + 14);

          const month = monthNames[dateObj.getMonth()];
          const returnMonth = monthNames[returnDate.getMonth()];

          const day = String(dateObj.getDate()).padStart(2, '0');
          const returnDay = String(returnDate.getDate()).padStart(2, '0');

          const year = dateObj.getFullYear();
          const returnYear = returnDate.getFullYear();

          const dateOutput = `${day}/${month}/${year}`;
          const returnDateOutput = `${returnDay}/${returnMonth}/${returnYear}`;

          knex.raw(`INSERT INTO library_checkouts (user_id, book_id, check_out_date, check_in_date) VALUES (${userID}, ${bookID}, '${dateOutput}', '${returnDateOutput}')`)
            .then((result) => {
              if (result.rowCount < 1) {
                res.status(418).send(`Error Adding Data to Database -- Unknown Error`);
              } else {
                res.status(201).send(`Processed`);
              }
            })
        }

      })
  }
});

app.get('/api/books/:bookID', (req, res) => {
  let id = parseInt(req.params.bookID);

  let returnObj = {};

  if (id === undefined || typeof id !== 'number') {
    res.status(400).send(`Invalid Data Received for this GET Request`);
  } else {
    knex.raw(`SELECT * FROM library_books WHERE book_id = ${id}`)
      .then((result) => {
        if (result.rows.length <= 0) {
          res.status(404).send(`No Book with ID ${id} exists`);
        } else {
          returnObj.book_id = result.rows[0].book_id;
          returnObj.book_title = result.rows[0].book_title;
          returnObj.book_sub_title = result.rows[0].book_sub_title;
          returnObj.book_author = result.rows[0].book_author;
          returnObj.book_isbn = result.rows[0].book_isbn;
          returnObj.book_checked_out = result.rows[0].book_checked_out;

          knex.raw(`SELECT * FROM library_checkouts WHERE book_id = ${id}`)
            .then((result) => {
              if (result.rows.length > 0) {
                returnObj.checkout_id = result.rows[0].checkout_id;
                returnObj.user_id = result.rows[0].user_id;
                returnObj.check_out_date = result.rows[0].check_out_date;
                returnObj.check_in_date = result.rows[0].check_in_date;
              }
            })
            .then( () => {
              res.status(200).json(returnObj);
            })
        }
      })
  }
  
});
/***********************************************************************************/
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });
  