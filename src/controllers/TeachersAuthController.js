const TeachersAuthModel = require("../models/TeachersAuthModel")
const jwt = require("jsonwebtoken")
const OtpModel = require("../models/OtpModel")
const SendEmailUtility = require("../utility/SendEmailUtility");

exports.Registration = async (req, res) => {

    let reqBody = req.body;
    try {
        let result = await TeachersAuthModel.create(reqBody);
        res.status(200).json({status: "success", data: result})

    } catch (e) {
        res.status(401).json({status: "fail", data: "Something went wrong"})
    }

}

exports.Login = async (req, res) => {

    let reqBody = req.params;
    try {
        let result = await TeachersAuthModel.find(reqBody).count();
        if (result === 1) {
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: reqBody['email']
            }

            let token = jwt.sign(Payload, 'SecretKey1234567890');
            let email = req.headers['email'];
            let result2 = await TeachersAuthModel.find(reqBody);
            res.status(200).json({status: "success", data: result2, token: token})


        } else {
            res.status(401).json({status: "fail", data: "No user found. Try again!"})
        }

    } catch (e) {
        res.status(401).json({status: "fail", data: "Something went wrong"})
    }

}

exports.AvailableTeachers = async (req, res) => {

    try {
        let result = await TeachersAuthModel.find();
        res.status(200).json({status: "success", data: result})

    } catch (e) {
        res.status(401).json({status: "fail", data: "No user found. Try again!"})
    }

}

exports.ProfileDetails = async (req, res) => {
    try {
        let email = req.headers['email'];
        let result = await TeachersAuthModel.find({email: email});
        res.status(200).json({status: 'success', data: result});
    } catch (e) {
        console.error(e);
        return res.status(401).json({status: 'fail', data: 'Internal Server Error'});
    }
};

exports.ProfileUpdate = async (req, res) => {
    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        let result = await TeachersAuthModel.updateOne({email: email}, reqBody);
        res.status(200).json({status: 'success', data: result});
    } catch (e) {
        console.error(e);
        return res.status(401).json({status: 'fail', data: 'Internal Server Error'});
    }
};

exports.RecoverVerifyEmail = async (req, res) => {

    let email = req.params.email;
    let OtpCode = Math.floor(100000 + Math.random() * 900000)
    let EmailText = "Your Verification Code is: " + OtpCode;
    let EmailSubject = "My Campus App Verification Code is- "

    let result = await TeachersAuthModel.find({email: email}).count();

    if (result === 1) {
        await SendEmailUtility(email, EmailText, EmailSubject);
        let result = await OtpModel.create({email: email, otp: OtpCode})
        res.status(200).json({status: "success", data: "A 6 digit OTP code sent to your email"})


    } else {
        res.status(401).json({status: "fail", data: "No user found. Try again!"})
    }

}

exports.RecoverVerifyOtp = async (req, res) => {
    let email = req.params.email;
    let OtpCode = req.params.otp
    let status = 0;
    let updateStatus = 1;

    let result = await OtpModel.find({email: email, otp: OtpCode, status: status}).count();

    if (result === 1) {

        let result = await OtpModel.updateOne({email: email, otp: OtpCode, status: status}, {status: updateStatus});
        res.status(200).json({status: "success", data: "Otp Verified"})


    } else {
        res.status(401).json({status: "fail", data: "Invalid Otp"})
    }

}

exports.RecoverResetPassword = async (req, res) => {
    let email = req.body['email'];
    let OtpCode = req.body['OTP'];
    let newPass = req.body['password']
    let updateStatus = 1;

    let result = await OtpModel.find({email: email, otp: OtpCode, status: updateStatus}).count();

    if (result === 1) {

        let result = await TeachersAuthModel.updateOne({email: email}, {password: newPass});
        res.status(200).json({status: "success", data: "Password Reset Success"})


    } else {
        res.status(401).json({status: "fail", data: "Password reset failed"})
    }

}