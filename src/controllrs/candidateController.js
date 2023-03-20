// const mongoose = require("mongoose")  // --> importing the mongoose
const candidateModel = require("../models/candidateModel")  // --> importing the internModel module
const { isValid, nameRegex, emailRegex, mobileRegex } = require("../validations/validator")  // --> importing the validator module



const createCandidate = async function (req, res) {
    try {
        let data = req.body  // --> input is taken from the request body
        if (Object.keys(data).length === 0)  // --> if there is no input provided in the request body
            return res.status(400).send({ status: false, message: "Please enter the name, email, mobile and address. ⚠️" });

        const { name, email, mobile, address } = data  // --> destructuring the object


        // validations for the fields provided in the request body

        if (!isValid(name))  // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the candidate name. ⚠️" })
        if (!nameRegex.test(name))  // --> name should be provided in right format
            return res.status(400).send({ status: false, message: "name should contain alphabets only. ⚠️" })

        if (!isValid(email))  // --> email should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the email. ⚠️" })
        if (!emailRegex.test(email))  // --> email should be provided in right format
            return res.status(400).send({ status: false, message: "Please enter the emailId in right format. ⚠️" })
        let getEmail = await candidateModel.findOne({ email: email });  // --> to check if provided email is already present in the database
        if (getEmail) {  // --> if that email is already provided in the database
            return res.status(400).send({ status: false, message: "Email is already in use, please enter a new one ⚠️" });
        }

        if (!isValid(mobile))  // --> mobile number should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the mobile number. ⚠️" })
        if (!mobileRegex.test(mobile))  // --> mobile number should be provided in right format
            return res.status(400).send({ status: false, message: "Enter the mobile number in valid Indian format. ⚠️" })
        let getMobile = await candidateModel.findOne({ mobile: mobile });  // --> to check if provided mobile number is already present in the database
        if (getMobile) {  // --> if that mobile number is already provided in the database
            return res.status(400).send({ status: false, message: "Mobile number is already in use, please enter a new one. ⚠️" });
        }

        if (!isValid(address))
            return res.status(400).send({ status: false, message: "Please enter the address. ⚠️" })


        let candidateCreated = await candidateModel.create(data)  // --> a new candidate document is created in the database
        return res.status(201).send({ status: true, data: candidateCreated })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const getCandidate = async function (req, res) {
    try {
        let data = req.body;
        let page = data.page;
        let limit = data.limit;
        let search = data.search;


        if (search != 0) {
            var getcandidate = await candidateModel.find({
                "$or": [
                    { name: { $regex: search } },
                    { email: { $regex: search } },
                    { mobile: { $regex: search } },
                    { address: { $regex: search } },
                ]
            })
        }
        if (search == 0) {
            var getcandidate = await candidateModel.find().limit(limit * 1).skip((page - 1) * limit)
                .exec();
            var count = await candidateModel.countDocuments();
        }

        return res.status(201).send({
            status: true,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: getcandidate
        })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}







module.exports.createCandidate = createCandidate
module.exports.getCandidate = getCandidate  