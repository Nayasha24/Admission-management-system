const express = require("express");
const app = express();

const parser = require('handlebars-error-parser').parser;
var html = '{{#foo}}{{/bar}}';
var parsed;
try {
    hbs.precompile(html);
} catch (e) {
    parsed = parser(e, html);
}

const path = require("path");

const Student = require("./studentregdata");
const Admin = require("./adminregdata");
const Contact = require("./contactdata");
const StudentApplication = require("./studentapplication");
const SelectedStudents = require("./selectedstudents")
const { Console } = require("console");
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
            if (SelectedStudents.findOne({email:studentmail.email})) {
                res.status(201).render("studashboard",{
                    user:user,
                    Admissionmessage:"Your application is Selected"
                });
                return;
            } else if(StudentApplication.findOne({email:studentmail.email})){
                res.status(201).render("studashboard",{
                    user:user,
                    Admissionmessage:"Your application is pending"
                });
                return;
            } else{
                res.status(201).render("studashboard",{
                    user:user,
                    Admissionmessage:"Please fill the admission Form"
                });
                return;
            }
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
        
        StudentApplication.findOne([{firstname:firstname},{lastname:lastname},{email:email}],(err,allData)=>{
            if(err){
                console.log(err);
            }else{
                
                res.status(201).render("/studashboard",{data:allData})
            }    
    })
        
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
        console.log(Student.countDocuments());
        const num=await Student.countDocuments();
        const num1=await Admin.countDocuments();
        const num2=await StudentApplication.countDocuments();
        const num3=await SelectedStudents.countDocuments();


        if(adminmail.password===password){
            res.status(201).render("admindashboard",{
                user:user,
                userscount:num,
                admincount:num1,
                appcount:num2,
                selectedcount:num3
            });
            return;
        }else{
            res.send("password are not matching");
        }
    } catch(error) {
        res.status(400).send("invalid......")
    }
})

app.get("/viewapplicationall",(req,res)=>{
    StudentApplication.find({},(err,allDetails)=>{
        if(err){
            console.log(err);
        }else{
            res.render("viewapplicationall",{details:allDetails})
        }
    })
})

app.get("/viewapplicationall/:id", async(req,res)=>{
    try {
        var id = req.params['id'];
        const resultStudent = await StudentApplication.findById(id);
        res.status(201).render("viewstudentapp",{
            firstname:resultStudent.firstname,
            lastname:resultStudent.lastname,
            email:resultStudent.email,
            mobile:resultStudent.contact,
            dob:resultStudent.dob,
            address:resultStudent.address,
            gender:resultStudent.gender,
            state:resultStudent.state,
            city:resultStudent.city,
            pin:resultStudent.pin,
            program:resultStudent.program,
            specialization:resultStudent.specialization
        });
    }catch (error) {
        console.log(error);
    }
    
})

app.get("/searchapp",(req,res)=>{
    res.render("searchapp");
})

app.get("/searchapplication",(req,res)=>{
    const query = req.body.searchname;
    console.log(req.body.searchname);
    StudentApplication.find({$or:[{$expr:{$eq:[{$concat:["$firstname",'',"$lastname"]}, query]}},{email:query},{contact:query}]},(err,allDetails)=>{
        if(err){
            console.log(err);
        }else{
            res.render("searchapp",{details:allDetails});
        }
    }).clone();
    
});

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.post("/contact",async (req,res)=>{
    try {
        
        const contactform = new Contact({
            firstname:req.body.first_name,
            lastname:req.body.last_name,
            email:req.body.email,
            contact:req.body.Phone,
            message:req.body.message
        })  

        const Contacted = await contactform.save();
        res.status(201).render("contact");
    }catch (error) {
        res.status(400).send(error);
    }
})

app.get("/enquiry",async(req,res)=>{
    Contact.find({},(err,allDetails)=>{
        if(err){
            console.log(err);
        }else{
            const date_obj=new Date();
            res.render("enquiry",{details:allDetails});
        }
    })
})

app.get("/registereduser",(req,res)=>{
    Student.find({},(err,allDetails)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("registereduser",{details:allDetails});
        }
    })
})

app.get("/registeredadmin",(req,res)=>{
    Admin.find({},(err,allDetails)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("registeredadmin",{details:allDetails});
        }
    })
})

app.post("/viewstudentapp",async(req,res)=>{
    try {
        
        const selectedStudentdata = new SelectedStudents({
            firstname:StudentApplication.firstname,
            lastname:StudentApplication.lastname,
            email:StudentApplication.email,
            contact:StudentApplication.mobile,
            gender:StudentApplication.gender,
            dob:StudentApplication.dob,
            address:StudentApplication.address,
            city:StudentApplication.city,
            pin:StudentApplication.pin,
            state:StudentApplication.state,
            program:StudentApplication.qualification,
            specialization:StudentApplication.specialization,
            status:"Selected",
            fees:req.body.fees
        })
        const selectedStudents = await selectedStudentdata.save();
        res.status(201).render("viewapplicationall",{status:"Selected"});
    }catch(err){
        res.status(404).send(err);
    }
})

app.listen(port, ()=>{
    console.log("Connection Successful....");
})
    