const express = require("express");
const app = express();

const path = require("path");

const Student = require("./studentregdata");
const Admin = require("./adminregdata");
const StudentApplication = require("./studentapplication")
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
        if (password===cpassword){
            const registerStudent = new Student({
                username:req.body.username,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                email:req.body.email,
                contact:req.body.contact
            })

            const registeredStudents = await registerStudent.save();
            res.status(201).render("index")
        }else{
            res.send("password dont match")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})



app.post("/login", async (req,res)=>{
    try {
        
        const user = req.body.username;
        const password = req.body.password;
        
        const studentmail = await Student.findOne({username:user});
        if(studentmail.password===password){
            res.status(201).render("studashboard",{
                user:user
            });
        }else{
            res.send("password are not matching");
        }
    } catch(error) {
        res.status(400).send("invalid......")
    }
})

app.get("/regform",(req,res)=>{
    res.render("regform");
})

app.post("/regform", async (req,res)=>{
    try {
        
        const StudentForm = new StudentApplication({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            contact:req.body.mobile,
            gender:req.body.gender,
            dob:req.body.dob,
            address:req.body.address,
            city:req.body.city,
            pin:req.body.pin,
            state:req.body.state,
            program:req.body.qualification,
            specialization:req.body.specialization
        })

        const appliedStudents = await StudentForm.save();
        res.status(201).render("studashboard")
        
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/adminsignup",(req,res)=>{
    res.render("adminsignup");
})

app.post("/adminsignup", async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password===cpassword){
            const registerAdmin = new Admin({
                username:req.body.username,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                email:req.body.email,
                contact:req.body.contact
            })

            const registeredAdmins = await registerAdmin.save();
            res.status(201).render("index")
        }else{
            res.send("password dont match")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/adminlogin", async (req,res)=>{
    try {
        
        const user = req.body.username;
        const password = req.body.password;
        
        const adminmail = await Admin.findOne({username:user});
        if(adminmail.password===password){
            res.status(201).render("admindashboard",{
                user:user
            });
        }else{
            res.send("password are not matching");
        }
    } catch(error) {
        res.status(400).send("invalid......")
    }
})

app.listen(port, ()=>{
    console.log("Connection Successful....");
})