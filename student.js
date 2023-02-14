server.js
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/prochannel" , {useNewUrlParser: true})
.then(()=>console.log("connection successful"))
.catch((err)=>console.log(err));

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3
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
        type: Number,
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