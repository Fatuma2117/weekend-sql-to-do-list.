const express = require('express');
const router = express.Router();

const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'LocalHost'
});

pool.on('connect', () => {
    console.log('Yay! We are talking to our postgresql database!');
})

pool.on('error', (error) => {
    console.log('Something with postgresql really broke. It broke hard.', error);
})

//////////////////////////////////////////////


router.get('/', (req, res) => {
    console.log('GET /task');
    let queryText = `
      SELECT * FROM "weekend-to-do-app"
        ORDER BY "id";
    `;
    pool.query(queryText)
        .then((dbResult) => {
            console.log(dbResult.rows);
            res.send(dbResult.rows);
        })
        .catch((dbError) => {
            console.log('error in GET /task db request:', dbError);
            res.sendStatus(500);
        })
});


router.post('/', (req, res) => {
    console.log('POST /task');
    console.log( req.body);
    let sqlQuery = `
      INSERT INTO "weekend-to-do-app" ( "task","priority", "notes", "complete_by_date")
        VALUES 
        ($1, $2, $3, $4);
    `;
    let sqlValues = [
        req.body.task,
        req.body.priority,
        req.body.notes,
        req.body.complete_by_date
    ];
    pool.query(sqlQuery, sqlValues)
        .then((dbResult) => {
            res.sendStatus(201);
        })
        .catch((dbError) => {
            console.log('error in POST /task db request:');
            console.log(dbError);
        })
});












module.exports = router;