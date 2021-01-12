require('dotenv').config()
const express = require ("express");
const bodyParser = require('body-parser');
const cors = require ("cors");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running")
});


app.post("/email", (req,res) => {

    res.header("Access-Control-Allow-Origin", "*");

    const body = req.body.contact.message;
    const name = req.body.contact.name;
    const email = req.body.contact.email;

    const msg = {
        to: (process.env.EMAIL),
        from: (process.env.EMAIL),
        subject: "Portfolio Contact from " + name,
        text: body,
    };

    sgMail.send(msg)
        .then(() => {}, error => {
            console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    });
    
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started succesfully");
});
