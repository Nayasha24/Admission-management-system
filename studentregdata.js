const mongoose = require("mongoose");
var validator = require('validator');


const studentSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 3,
        unique:true
    },
    password:{
        type: String,
        required: true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Weak Password");
            }
        }
    },
    confirmpassword:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:[true, "Email is already present"],
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email")
            }
        }
    },
    contact:{
        type: String,
        required: true,
        validate(val){
            if(!validator.isMobilePhone(val)){
                throw new Error("Invalid Phone Number")
            }
        }
    }
})

const Student = new mongoose.model("Student",studentSchema);

module.exports = Student;