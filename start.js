const express = require('express');
const myAwesomeRoute = require('./router.js');
 
const app = express();
 
app.use('/books', myAwesomeRoute);

app.use(express.json());
 
app.listen(3000, () => {console.log('App listening on port 3000');});