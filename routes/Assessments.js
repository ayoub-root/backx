var express = require('express');
var AccountsSchema= require('../models/Accounts');
var router = express.Router();
const EvaluationsSchema = require("../models/Evaluations");
const AssessmentsSchema = require("../models/Assessments");
const Patients = require('../models/Patients');

router.post("/id", async (req, res) => {
  console.log(req.body.id)
  const assessment = await AssessmentsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).json({ result });
  }
  );
});

router.post("/getone", async (req, res) => {
  console.log(req.body.id)
  const assessment = await AssessmentsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).json({ result });
  }
  );
});

// router.post("/delete", async (req, res) => {
//   console.log(req.body.id)
//   const assessment = await PatientsSchema.findById(req.body.id).exec(function (err, result) {
//     if (err) throw err;
//     //console.log(result);
//     res.status(200).json({ result });
//   }
//   );
// });
//

router.get("/models", async (req, res) => {
  const assessment = await AssessmentsSchema.find({type:'model'})//.populate('accounts');
  res.status(200).json(assessment);
});

router.post("/myassessments", async (req, res) => {
  const assessment = await AssessmentsSchema.find({type:req.body.type,creator:req.body.creator})//.populate('accounts');
  res.status(200).json(assessment);
});

router.get("/", async (req, res) => {
  const assessment = await AssessmentsSchema.find()//.populate('accounts');
  res.status(200).json(assessment);
});
router.get("/all", async (req, res) => {
  const assessment = await AssessmentsSchema.find().populate('account_id', '-password').exec(function (err, result) {
    if (err) throw err;
   // console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
//console.log(req.body.zone)

const account= await AccountsSchema.findById(req.body.creator);
console.log(req.body.blocks)
  const assessment = new AssessmentsSchema(
    {
      //patient_id: await PatientsSchema.findById(req.body.patient_id),
      //date: req.body.date,
      
      title: req.body.title,
      category: req.body.category,
      desease:req.body.desease,
      diagnosis:req.body.diagnosis,
     // target: req.body.target,
      creator: await AccountsSchema.findById(req.body.creator),
      description: req.body.description,
      //zone: req.body.zone,
      //filter: req.body.filter,
      type:req.body.type,
      state:req.body.state,
     // iditable:req.body.editable,
      //evaluations:await EvaluationsSchema.findByIdAndUpdate(req.body.evaluations),
      blocks:req.body.blocks,
      created_at: Date(),
      updated_at: Date(),
    });
  state = await assessment.save();
 
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })

});

router.post("/removeassessment", async (req, res) => {
 // console.log(req.body.item_id, req.body.creator)
  await AssessmentsSchema.deleteOne({ creator: req.body.creator,_id:req.body.assessment_id },).exec(async function(err, result) {
    if (err) throw err;
    const assessment = await AssessmentsSchema.find().populate('account_id', '-password').exec(function (err, result) {
      if (err) throw err;
     // console.log(result);
      res.status(200).json({ result });
    }
    );
  }
  );
});
//////////
router.post("/update", async (req, res) => {
  //console.log(req.body.assessment, req.body.id)
  await AssessmentsSchema.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      category: req.body.category,
      desease:req.body.desease,
      diagnosis:req.body.diagnosis,
      //target: req.body.target,
      description: req.body.description,
      //zone: req.body.zone,
      //filter: req.body.filter,
        // iditable:req.body.editable,
      //evaluations:await EvaluationsSchema.findByIdAndUpdate(req.body.evaluations),
      blocks:req.body.blocks,

     },
  
  ).exec( function(err, result) {
    if (err) throw err;
    console.log(result);
     res.status(200).json({result});
  }
  );
});


router.post("/updatediags", async (req, res) => {
  //console.log(req.body.assessment, req.body.id)
  await AssessmentsSchema.updateMany({"diagnosis": req.body.olddiag}, {"$set":{"diagnosis": req.body.newdiag}}).
  exec( function(err, result) {
    if (err) throw err;
    console.log(result);
     res.status(200).json({result});
  }
  );
});
module.exports = router;