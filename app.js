const express = require("express");
const app = express();

const path = require("path");

const Student = require("./studentregdata");
require("./conn.js");
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname,"./public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/Signup",(req,res)=>{
    res.render("Signup");
})

app.post("/Signup", async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log("Connection Successful....");
})