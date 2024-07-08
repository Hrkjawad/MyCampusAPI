const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true},
    fullName:{type:String},
    designation:{type:String},
    department:{type:String},
    password:{type:String},
    count:{type:String,default: '1'},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const UsersModel=mongoose.model('teachersAuths',DataSchema);
module.exports=UsersModel
