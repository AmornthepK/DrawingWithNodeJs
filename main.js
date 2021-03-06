const config = require('./config/config.json');

const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || config.port;


app.get("/",function(request,response){
    response.send("Draw board /n img at: " + config.imgLocation)
})

app.get("/draw", function (request, response) {
    response.sendFile(path.join(__dirname, '/main.html'));
});

app.use(express.static(path.join(__dirname, 'utility2')));
app.use(express.static(path.join(__dirname, 'config')));

app.listen(port, function () {
  console.log("Started application on port %d", port);
});
