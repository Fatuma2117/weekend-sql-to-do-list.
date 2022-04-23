const express = require('express');
const bodyParser = require('body-parser');


let todoRouter = require('./routes/todo.router');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));


app.use('/task', todoRouter);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Woohoo Server is up! http://localhost:${PORT}`)
});
