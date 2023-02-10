const mongoose = require("mongoose");
var validator = require('validator');


const contactdatabase = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minlength: 3
    },
    lastname:{
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
    },
    message:{
        type: String,
        required: true,
        minlength:10
    }
})

const Contact = new mongoose.model("Contact",contactdatabase);

module.exports = Contact;