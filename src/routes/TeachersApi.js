const express = require("express");
const router = express.Router();
const TeachersAuthController = require('../controllers/TeachersAuthController')
const TeacherAuthVerifyMiddleware=require("../middleWare/TeacherAuthVerifyMiddleWare");
const TeacherTasksController = require('../controllers/TeacherTaskController')
const StudentAuthVerifyMiddleWare = require("../middleWare/StudentAuthVerifyMiddleWare");
const StudentTasksController = require("../controllers/StudentTaskController");

router.post('/Registration', TeachersAuthController.Registration)
router.get('/Login/:email/:password', TeachersAuthController.Login)
router.get('/AvailableTeachers', TeachersAuthController.AvailableTeachers)
router.get('/ProfileDetails', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileDetails)
router.post('/ProfileUpdate', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",TeachersAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",TeachersAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",TeachersAuthController.RecoverResetPassword);


//router.post("/createTask",TeacherAuthVerifyMiddleware,TeacherTasksController.createTask);
router.post("/createSubjectGroupBatchSections",TeacherAuthVerifyMiddleware,TeacherTasksController.createSubjectGroupBatchSections);
router.post("/joinSubjectGroupBatchSections/:id",TeacherTasksController.joinSubjectGroupBatchSections);
router.post("/joinSubjectGroupBatchSections/:courseGroupId/:memberName",TeacherTasksController.chatSubjectGroupBatchSections);
router.get("/teacherAddTask/:batch/:section/:title/:taskType",TeacherAuthVerifyMiddleware,TeacherTasksController.teacherAddTask);
router.post("/facultyMeeting",TeacherAuthVerifyMiddleware, TeacherTasksController.facultyMeeting);
router.get("/showFacultyMeeting",TeacherAuthVerifyMiddleware, TeacherTasksController.showFacultyMeeting);
router.post("/announcement",TeacherAuthVerifyMiddleware, TeacherTasksController.announcement);
router.get("/showAnnouncement",TeacherAuthVerifyMiddleware, TeacherTasksController.showAnnouncement);
router.post("/resource",TeacherAuthVerifyMiddleware, TeacherTasksController.resource);
router.get("/showResources",TeacherAuthVerifyMiddleware, TeacherTasksController.showResources);
router.post("/facAddMyTodo",TeacherAuthVerifyMiddleware, TeacherTasksController.facAddMyTodo);
router.get("/showFacMyTodo",TeacherAuthVerifyMiddleware,TeacherTasksController.showFacMyTodo);
//router.post("/joinGroupBySubjId/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.createGroup2);
//router.post("/chatGroup/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.chatGroup);
router.get("/deleteTeacherTask/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTeacherTask);
router.get("/deleteFacultyMeeting/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteFacultyMeeting);
router.get("/deleteTeacherAnnouncement/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTeacherAnnouncement);
router.post("/updateSubjectGroupDetails/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.updateSubjectGroupDetails);

router.get("/listTaskByStatus/:batch",TeacherAuthVerifyMiddleware,TeacherTasksController.listTaskByStatus);
router.get("/taskStatusCount",TeacherAuthVerifyMiddleware,TeacherTasksController.taskStatusCount);

// available
router.get("/showFacultySubGrpBatchSec", TeacherAuthVerifyMiddleware, TeacherTasksController.showFacultySubGrpBatchSec);
router.get("/showChats/:groupId", TeacherAuthVerifyMiddleware, TeacherTasksController.showChats);


module.exports = router;