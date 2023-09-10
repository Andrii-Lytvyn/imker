const express = require('express');
const app = express();

// get our port
const port = process.env.PORT || 3000;

// applicaton code goes here

// have node listen on our port
app.listen(port, () => console.log(`App listening on port ${port}!`));
