const express = require('express');
const router = express.Router();

const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
  database: 'weekend-to-do-app',
  host: 'localhost'
});

pool.on('connect', () => {
    console.log('Yay! We are talking to our postgresql database!');
  })
  
  pool.on('error', (error) => {
    console.log('Something with postgresql really broke. It broke hard.', error);
  })





















  module.exports = router;