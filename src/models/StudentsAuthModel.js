const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true},
    fullName:{type:String},
    studentId:{type:String, unique:true},
    department:{type:String},
    batch:{type:String},
    section:{type:String},
    varsity:{type:String},
    password:{type:String},
    count:{type:String,default: '0'},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});
const UsersModel=mongoose.model('stuAuths',DataSchema);
module.exports=UsersModel
