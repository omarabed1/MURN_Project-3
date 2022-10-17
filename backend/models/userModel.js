const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require("validator")
const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default: 'user',
  },
  followers:[{
    type:String,
}]
})

userSchema.statics.signup=async function( userName,firstName,lastName,password)
{
    if(!validator.isStrongPassword(password,{minUppercase: 0, minSymbols: 0,minNumbers: 0})){
        throw Error ('Password not strong enough')
    }
    if(!validator.isLength(userName,{min:3,max:20})){
        throw Error ('user name min 3 char max 20 char')
    }
    if(!validator.isLength(lastName,{min:3,max:20})){
        throw Error ('firstName min 3 char max 20 char')
    }
    if(!validator.isLength(firstName,{min:3,max:20})){
        throw Error ('lastName min 3 char max 20 char')
    }
    const existsUserName = await this.findOne({userName})
    
    if(existsUserName){
        throw Error('user name already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({userName,firstName,lastName,password:hash})

    return user
}
userSchema.statics.login=async function(userName, password){
    if(!userName  || !password){
        throw Error ("all fields must be filled")
    }
    const user = await this.findOne({userName})
    if(!user){
        throw Error ("Incorrect username")
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error ("Incorrect password")
    }
    return user
}
module.exports = mongoose.model('User',userSchema)