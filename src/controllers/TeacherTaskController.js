const TeacherTaskModel = require("../models/TeacherTaskModel")
const CourseTeacherGroupModel = require("../models/CourseTeacherGroupModel")
const TeacherAddTask = require("../models/TeacherAddTaskModel");
const FacultyMeeting = require("../models/FacultyMeetingModel");
const TeacherAnnouncement = require("../models/TeacherAnnouncementModel");
const Resource = require("../models/ResourceModel");
const path = require("path");
const StuAddMyTodoModel = require("../models/StuAddMyTodoModel");
const FacAddMyTodoModel = require("../models/FacAddMyTodoModel");


/// same documents ey id te ekoi type er multiple object add korar code
exports.createSubjectGroupBatchSections = async (req, res) => {
    try {

        let id = req.params.id;
        let findId = {_id: id} // id found
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member];

        const mainDocument = await CourseTeacherGroupModel.find(
            {batch: reqBody.batch, courseCode: reqBody.courseCode, courseTitle: reqBody.courseTitle}
        ).count();
        console.log(mainDocument)

        if (!mainDocument) {
            try {
                let result = await CourseTeacherGroupModel.create(reqBody)
                return res.status(200).json({status: 'success', data: result});
            } catch (e) {
                console.log("Main document not found");
                return res.status(400).json({status: 'fail', data: 'Group is already added!'});
            }


        } else {
            return res.status(400).json({status: 'fail', data: 'Group is already added!'});

        }

        // const existingMembers = mainDocument.member.filter(existingMember =>
        //     members.some(newMember => existingMember.name === newMember.name)
        // );
        //
        // if (existingMembers.length === 0) {
        //     // Add new members to the array using $push
        //     mainDocument.member.push(...members);
        //
        //     // Save the updated document
        //     const updatedDocument = await mainDocument.save();
        //     return res.status(200).json({status: 'success', data: updatedDocument});
        // } else {
        //     console.log("Group is already added");
        //     return res.status(200).json({status: 'fail', data: 'One or more group already added'});
        // }
    } catch (e) {
        console.error(e.toString());
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
};

exports.joinSubjectGroupBatchSections = async (req, res) => {
    try {
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member];

        let courseTeacherGroupDocument = await CourseTeacherGroupModel.find(); // document searching of other collections
        let idFind = req.params.id
        console.log(idFind)

        if (courseTeacherGroupDocument) {
            for (let i = 0; i < courseTeacherGroupDocument.length; i++) {
                const courseTeacherGroupDocuments = courseTeacherGroupDocument[i];
                const id3 = courseTeacherGroupDocuments._id;
                //const membersObjectId = courseTeacherGroupDocuments.member.map(member => member._id);

                if (id3.toString() === idFind) {
                    console.log("Found document ID:", id3);

                    const existingMembers = courseTeacherGroupDocuments.member.filter(existingMember =>
                        members.some(newMember => existingMember.name === newMember.name)
                    );

                    if (existingMembers.length === 0) { /// existingMembers.length === 1 && count = 0
                        // Add new members to the array using $push
                        courseTeacherGroupDocuments.member.push(...members);

                        // Save the updated document
                        const updatedDocument = await courseTeacherGroupDocuments.save();
                        return res.status(200).json({status: 'success', data: updatedDocument});
                    } else {
                        return res.status(500).json({status: 'fail', data: 'Already added'});
                    }


                }
            }

        } else {
            console.log("No documents found in CourseTeacherGroupModel collection.");
        }
    } catch (e) {
        console.error(e.toString());
        return res.status(500).json({status: 'fail', data: e.toString()});
    }
};

exports.chatSubjectGroupBatchSections = async (req, res) => {
    try {

        let id = req.params.courseGroupId;
        //let id9 = req.params.memberId;
        let id9 = req.params.memberName;
        let findId = {_id: id} // id found
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member];

        let courseTeacherGroupDocument = await CourseTeacherGroupModel.find(); // document searching of other collections
        let idFind = req.params.id
        console.log('g', idFind)

        if (courseTeacherGroupDocument) {
            for (let i = 0; i < courseTeacherGroupDocument.length; i++) {
                const courseTeacherGroupDocuments = courseTeacherGroupDocument[i];
                const id3 = courseTeacherGroupDocuments._id;
                const membersObjectId = courseTeacherGroupDocuments.member.map(member => member.name);
                console.log('j', membersObjectId)

                for (let j = 0; j < courseTeacherGroupDocuments.member.length; j++) {
                    const member = courseTeacherGroupDocuments.member[j];
                    const memberObjectId = member.name;
                    console.log("Member's Object ID:", memberObjectId);
                    if (memberObjectId.toString() === id9) {
                        console.log('Found');
                        member.chat.push(reqBody) // ono aslam
                        await courseTeacherGroupDocuments.save();
                        return res.status(200).json({status: 'success', data: reqBody});

                    } else {
                        console.log('Invalid Member');
                    }
                }
            }

        } else {
            console.log("No documents or course group found in CourseTeacherGroupModel collection.");
        }

    } catch (e) {
        console.error(e.toString());
        return res.status(200).json({status: 'fail', data: e.toString()});
    }
};

exports.teacherAddTask = async (req, res) => {
    try {

        let reqBody = req.params
        let email = req.headers['email']
        await TeacherAddTask.create({email: email, ...reqBody})
        let result = await TeacherAddTask.find({email: email})
        return res.status(200).json({status: 'success', data: result});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Not Found'});
    }
};

exports.facultyMeeting = async (req, res) => {
    try {

        let reqBody = req.body
        let email = req.headers['email']
        //console.log(email)
        await FacultyMeeting.create({email: email, ...reqBody})
        let result = await FacultyMeeting.find({email: email})
        return res.status(200).json({status: 'success', data: reqBody});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Try Again'});
    }
};

exports.showFacultyMeeting = async (req, res) => {
    try {

        let reqBody = req.params
        let email = req.headers['email']
        //console.log(email)
        //await FacultyMeeting.create({email: email, ...reqBody})
        let result = await FacultyMeeting.find({email: email})
        return res.status(200).json({status: 'success', data: result});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Try Again'});
    }
};

exports.announcement = async (req, res) => {
    try {

        let reqBody = req.body
        let email = req.headers['email']
        //console.log(reqBody2)
        await TeacherAnnouncement.create({email: email, ...reqBody})
        let result = await TeacherAnnouncement.find({email: email});
        console.log(result)

        return res.status(200).json({status: 'success', data: reqBody});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Try Again'});
    }
};

exports.showAnnouncement = async (req, res) => {
    try {

        let reqBody = req.params
        let email = req.headers['email']
        //console.log(reqBody2)
        //await TeacherAnnouncement.find({email:email})
        let result = await TeacherAnnouncement.find({email: email});
        //console.log(result)

        return res.status(200).json({status: 'success', data: result});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Try Again'});
    }
};

exports.facAddMyTodo=async(req,res)=>{

    try{
        let reqBody = req.body;
        reqBody.email = req.headers['email'];

        let result = await FacAddMyTodoModel.create(reqBody)
        res.status(200).json({ status: 'success', data: result });

    }catch(e){
        res.status(400).json({ status: 'fail', data: 'Try again' });
    }



}

exports.showFacMyTodo=async(req,res)=>{

    try{
        let result = await FacAddMyTodoModel.find()
        let count = result.length
        res.status(200).json({ status: 'success', count: count, data: result });

    }catch(e){
        res.status(400).json({ status: 'fail', data: 'Try again' });
    }



}

exports.resource = async (req, res) => {
    try {

        let reqBody = req.body
        let email = req.headers['email']
        //console.log(reqBody2)
        await Resource.create({email: email, ...reqBody})
        let result = await Resource.find({email: email});
        console.log(result)

        return res.status(200).json({status: 'success', data: reqBody});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Try Again'});
    }
};

exports.showResources = async (req, res) => {
    try {

        let reqBody = req.params
        let email = req.headers['email']
        //console.log(reqBody2)
        //await TeacherAnnouncement.find({email:email})
        let result = await Resource.find({email: email});
        //console.log(result)

        return res.status(200).json({status: 'success', data: result});

    } catch (e) {
        console.error(e.toString());
        return res.status(404).json({status: 'fail', data: 'Try Again'});
    }
};

exports.deleteTeacherTask = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteTask = {_id: id}

        let result = await TeacherAddTask.deleteOne(deleteTask)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }
}
exports.deleteFacultyMeeting = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteTask = {_id: id}

        let result = await FacultyMeeting.deleteOne(deleteTask)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }
}
exports.deleteTeacherAnnouncement = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteTask = {_id: id}

        let result = await TeacherAnnouncement.deleteOne(deleteTask)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }
}//

exports.updateSubjectGroupDetails = async (req, res) => {

    try {

        let id = req.params.id;
        // let courseCode = req.params.courseCode;
        let updateTask = {_id: id};
        let reqBody = req.body;

        let result = await CourseTeacherGroupModel.updateOne(updateTask, reqBody)
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }

}

exports.listTaskByStatus = async (req, res) => {

    try {

        let batch = req.params.batch;
        let email = req.headers['email']

        let result = await CourseTeacherGroupModel.find({email: email, batch: batch})
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }

}

/// showTeacherBatchList
exports.taskStatusCount = async (req, res) => {

    try {

        let email = req.headers['email'];
        let result = await TeacherTaskModel.aggregate([{$match: {email: email}}, {
            $group: {
                _id: {
                    batch: "$batch", section: "$section", courseCode: "$courseCode", courseTitle: "$courseTitle"
                }, sum: {$count: {}}
            }
        }]);
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}


exports.showFacultySubGrpBatchSec = async (req, res) => {

    try {

        const email = req.headers['email']
        let result = await CourseTeacherGroupModel.find({email: email})
        console.log(result)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(400).json({status: 'fail', data: 'Try again'});
    }
}

exports.showChats = async (req, res) => {

    try {
        const email = req.headers['email'];
        const groupId = req.params.groupId;
        let result = await CourseTeacherGroupModel.find({ email: email, _id: groupId});
        let membersOnly = result.reduce((acc, course) => {
            return acc.concat(course.member);
        }, []);
        res.status(200).json({ status: 'success', data: membersOnly });
    } catch (e) {
        res.status(400).json({ status: 'fail', data: 'Try again' });
    }
}

exports.availableCourseBatch = async (req, res) => {

    try {
        let result = await CourseTeacherGroupModel.aggregate([
            {
                $project: {
                    _id: 1,
                    batch: 1,
                    courseCode: 1,
                    courseTitle: 1,
                    email: 1,
                    member: {
                        name: 1,
                        designation: 1,
                        department: 1
                    }
                }
            }
        ]);
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(400).json({status: 'fail', data: 'Try again'});
    }

}

exports.allAnnouncement = async (req, res) => {

    try {

        let batch = req.params.batch
        let result = await TeacherAnnouncement.find({batch: batch});
        return res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(400).json({status: 'fail', data: 'Try again'});
    }

}