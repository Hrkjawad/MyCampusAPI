const express = require("express");
const router = express.Router();
const StudentsAuthController = require('../controllers/StudentsAuthController')
const StudentAuthVerifyMiddleWare=require("../middleWare/StudentAuthVerifyMiddleWare");
const StudentTasksController = require('../controllers/StudentTaskController')
const TeacherTasksController = require("../controllers/TeacherTaskController");
const TeacherAuthVerifyMiddleware = require("../middleWare/TeacherAuthVerifyMiddleWare");

router.post('/Registration', StudentsAuthController.Registration)
router.get('/Login/:studentId/:password', StudentsAuthController.Login)
router.get('/ProfileDetails', StudentAuthVerifyMiddleWare, StudentsAuthController.ProfileDetails)
router.post('/ProfileUpdate', StudentAuthVerifyMiddleWare, StudentsAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",StudentsAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",StudentsAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",StudentsAuthController.RecoverResetPassword);


router.get("/availableCourseBatch", StudentTasksController.availableCourseBatch);
router.get("/allAnnouncement/:batch/:type", StudentTasksController.allAnnouncement);
router.get("/allAnnouncement2/:batch", StudentTasksController.allAnnouncement2);
router.get("/enrolledCourse/:memberName", StudentTasksController.enrolledCourse);
router.post("/stuAddMyTodo",StudentAuthVerifyMiddleWare,StudentTasksController.stuAddMyTodo);
router.get("/showStudentTodo",StudentAuthVerifyMiddleWare,StudentTasksController.showStuAddMyTodo);
router.post("/studentAddResources", StudentTasksController.resource);
router.get("/showStudentResources/:batch", StudentTasksController.showResources);

router.get("/deleteTask/:id",StudentAuthVerifyMiddleWare,StudentTasksController.deleteTask);
router.get("/updateTaskStatus/:id/:status",StudentAuthVerifyMiddleWare,StudentTasksController.updateTaskStatus);
router.get("/listTaskByStatus/:status",StudentAuthVerifyMiddleWare,StudentTasksController.listTaskByStatus);
router.get("/taskStatusCount",StudentAuthVerifyMiddleWare,StudentTasksController.taskStatusCount);


module.exports = router;