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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Aloow-Origin", "https://sendgrid.api-docs.io", "https://nickb6437.github.io/portfolio" );
    res.setHeader("Access-Control-Aloow-Methods", "POST");
    res.setHeader("Access-Control-Aloow-Headers", "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl");
    next()
})

app.get("/", (req, res) => {
    res.send("API is running")
});

app.post("/email", (req,res) => {

    
    const body = req.body.contact.message;
    const name = req.body.contact.name;
    const email = req.body.contact.email;

    const msg = {
        to: (process.env.EMAIL),
        from: (process.env.EMAIL),
        subject: "Portfolio Contact from " + name,
        text: email + " " + body,
    };

    sgMail.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });
            console.log("Sent")
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(401).json({
                success: false
            });
            console.log("Failed")
        });
    console.log(msg)
        
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started succesfully " + port);
});
