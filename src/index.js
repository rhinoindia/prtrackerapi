const express = require ('express');
const app = express();

//Start the server
const port = 4000;

app.listen(port, ()=>{
    console.log(`App Listening at port ${port}`);
});

