const  mongoose=require('mongoose');

const teacherAddTask = mongoose.Schema({
    email: {type: String},
    batch: { type: String },
    section: { type: String },
    courseTitle: { type: String },
    taskType: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const TeacherAddTask=mongoose.model('TeacherAddTask',teacherAddTask);
module.exports = TeacherAddTask


