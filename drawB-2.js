const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8881;



app.get("/",function(request,response){
    response.send("Hello World 2.2!")
})

app.get("/draw", function (request, response) {
    response.sendFile(path.join(__dirname, '/draw2.html'));
});

app.use(express.static(path.join(__dirname, 'utility2')));

app.listen(port, function () {
  console.log("Started application on port %d", port);
});
