const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8881;

app.use(express.static(path.join(__dirname, 'utility')));

app.get("/",function(request,response){
    response.send("Hello World 2.1!")
})

app.get("/draw", function (request, response) {
    response.sendFile(path.join(__dirname, '/draw.html'));
});

app.listen(port, function () {
  console.log("Started application on port %d", port);
});
