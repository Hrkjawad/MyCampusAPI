const  mongoose=require('mongoose');

const resource = mongoose.Schema({
    email: {type: String},
    resource: { type: String },
    batch: { type: String },
    date: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });


const StudentResource=mongoose.model('studentResource',resource);
module.exports = StudentResource


