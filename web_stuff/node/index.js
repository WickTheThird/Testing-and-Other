const express = require("express");
const bodyParser = require('body-parser');
const app = express();

let stack = {};

app.use(express.json());

// some debug stuff
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});


// this is adding a new person to the stack
app.post( "/save", function(req, res) {
 
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    res.setHeader("Content-Type", "application/json");

   if (stack[req.body.email] != undefined) {
       res.send(false);
   } else {
        stack[req.body.email] = req.body.password;

        const fs = require('fs');
        let data = JSON.stringify(stack, null, 2);

        fs.writeFile('../app/info/data.json', data, (err) => {
            if (err) throw err;
            res.send(true);
        });
   }

   console.log(stack);

});

// checking if a user exists in the stack
app.post("/check", function(req, res) {

    res.setHeader("Content-Type", "application/json");
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    if (req.body.email in stack) {
        res.send(true);
    } else {
         res.send(false);
    }

});

// listening on port 3001 (3000 is the login/main page)
app.listen(3001, function() {
    console.log("listening on port 3001");
})