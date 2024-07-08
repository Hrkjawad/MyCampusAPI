const  mongoose=require('mongoose');

const teacherAnnouncement = mongoose.Schema({
    email: {type: String},
    announcement: { type: String },
    batch: { type: String },
    type: { type: String },
    date: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const TeacherAnnouncement=mongoose.model('TeacherAnnouncement',teacherAnnouncement);
module.exports = TeacherAnnouncement


