const  mongoose=require('mongoose');

const ChatSchema = mongoose.Schema({
    message: { type: String },
    sender: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const MemberInfoSchema = mongoose.Schema({
    name: { type: String },
    batch: { type: String },
    designation: { type: String },
    department: { type: String },
    section: { type: String },
    chat:[ChatSchema],
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const DataSchema=mongoose.Schema({
    batch:{type:String},
    courseCode:{type:String},
    courseTitle:{type:String},
    email:{type:String},
    member:[MemberInfoSchema],
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const CourseTeacherGroupModel=mongoose.model('batchGroups',DataSchema); // ekane per group er jonno alada alada collection banaate hobe
//const ChatModel = mongoose.model('ChatModel', ChatSchema);
module.exports = CourseTeacherGroupModel


