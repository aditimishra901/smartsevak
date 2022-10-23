const mongoose=require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
      type:String,
      required:true,
    },
   phone: {
    type:Number,
    unique:true,
    required:true,
  },
   age:{
    type:Number,
     required:true,
  },
    gender: {
      type:String,
     required:true,
    },
});
userSchema.plugin(uniqueValidator);
module.exports=mongoose.model('User', userSchema);