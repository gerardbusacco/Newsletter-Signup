const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    
    const fname = req.body.FName;
    const lname = req.body.LName;
    const email = req.body.Email;

    const data = {
        // Array of objects
        members : [
            {
            email_address: email,
            status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }


// In order to communicate with twp servers. the language we used is Json
// JSON.parse() this is used to convert Json into object

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/eddfa696d6"

const options = {
    method: "POST",
    auth: "Gerard:2f2d93fb64dcf16887638d772b0c36d1-us21"
}

const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
       // console.log(JSON.parse(data));
       if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
       } else {
        res.sendFile(__dirname + "/failure.html");
       }

       response.on("data", function(data) {
        console.log(JSON.parse(data));
       })
    });

});

request.write(jsonData);
request.end();

});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.")
});

// Posting data to the server

// Install body-parser

// API Key
// 2f2d93fb64dcf16887638d772b0c36d1-us21

// Audience ID
// eddfa696d6