const mongoose = require("mongoose");
var validator = require('validator');

const selectedStudentSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minlength: 3,
    },
    lastname:{
        type: String,
        required: true,
        minlength: 3,
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
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    pin:{
        type: Number,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    program:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    status:{
        type:String
    },
    fees:{
        type:Number
    }
})

const SelectedStudents = new mongoose.model("SelectedStudent",selectedStudentSchema);

module.exports = SelectedStudents;