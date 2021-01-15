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
// app.use(cors({
//     origin: "https://nickb6437.github.io",
//     methods: ["GET", "POST"]
// }));

const corsOptions = {
    origin: "https://nickb6437.github.io",
    methods: ["GET", "POST"]
}

app.get("/", (req, res) => {
    res.send("API is running")
});


app.post("/email", cors(corsOptions), (req,res) => {

    
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
    console.log(msg)
        
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started succesfully " + port);
});
