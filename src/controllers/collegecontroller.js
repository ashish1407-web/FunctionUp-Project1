const collegemodel = require('../models/CollegeModel');
const Internmodel = require('../models/InternModel')
const valid = function (value) {

if (typeof value !== "string" || value.trim().length == 0) { return false }
return true
}
const createcollege = async function (req, res){
try{
    let college=req.body
    console.log(college);
    if (!college.name) { return res.status(400).send({ status: false, message: "name is required" }) }
    if (!college.fullname) { return res.status(400).send({ status: false, message: "fullname is required" }) }
        if (!college.logoLink) { return res.status(400).send({ status: false, message: "logolink is required" }) }
    var logo = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    if(!logo.test(college.logoLink)){ return res.status(400).send({ status: false, message: "logoLink is not valid" }) }
   if (!valid(college.name)) { return res.status(400).send({ status: false, message: " name is not valid" }) }
    if (!valid(college.fullname)) { return res.status(400).send({ status: false, message: " fullname  is not valid " }) }
    if (college.isDeleted) { if (typeof college.isDeleted !== "boolean") { return res.status(400).send({ status: false, message: "value must be in boolean" }) } }
     
   
    let collegeCreated = await collegemodel.create(college)
        res.status(201).send({ status:true,data: collegeCreated })
} catch(err)
{
return res.status(500).send(err.message);
}
}

const finddata=async function(req,res){
try{
let Data = req.query;
let keys=Object.keys(Data);
console.log(keys);
if(keys.length==0) return res.status(400).send({Error:"One Query Required"});
if(keys.length>1) return res.status(400).send({status:false,Error:"you have to give only one Query"});
let collegeDetail = await collegemodel.findOne({ name: Data.collegeName, isDeleted: false })
console.log(collegeDetail);
if (!collegeDetail) { res.status(404).send({ status: false, msg: "collegeDetail not found" }) }
let id = collegeDetail._id.toString()
let check = await Internmodel.find({ collegeId: id })
let obj = {
"name": collegeDetail.name,
"fullName": collegeDetail.fullname,
"logoLink": collegeDetail.logoLink,
"interests": check
}
res.status(200).send({ status: true, data: obj })
} catch(err){
res.status(500).send(err.message);
}
}
module.exports.createcollege=createcollege
module.exports.finddata=finddata



