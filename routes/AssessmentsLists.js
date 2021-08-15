var express = require('express');
var AccountsSchema= require('../models/Accounts');
const AssessmentsList = require('../models/AssessmentsList');
var router = express.Router();
const AssessmentsListsSchema = require("../models/AssessmentsList");
var UserSchema = require('../models/Users');

router.post("/id", async (req, res) => {
  //console.log(req.body.id)
  const assessment = await AssessmentsListsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    ////console.log(result);
    res.status(200).json({ result });
  }
  );
});

router.post("/getone", async (req, res) => {
  //console.log(req.body.id)
  const assessment = await AssessmentsListsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    ////console.log(result);
    res.status(200).json({ result });
  }
  );
});

// router.post("/delete", async (req, res) => {
//   //console.log(req.body.id)
//   const assessment = await PatientsSchema.findById(req.body.id).exec(function (err, result) {
//     if (err) throw err;
//     ////console.log(result);
//     res.status(200).json({ result });
//   }
//   );
// });
//

router.get("/models", async (req, res) => {
  const assessment = await AssessmentsListsSchema.find({type:'model'})//.populate('accounts');
  res.status(200).json(assessment);
});

router.post("/myassessments", async (req, res) => {
  const assessment = await AssessmentsListsSchema.find({type:req.body.type,creator:req.body.creator})//.populate('accounts');
  res.status(200).json(assessment);
});

router.get("/", async (req, res) => {
  const assessment = await AssessmentsListsSchema.find()//.populate('accounts');
  res.status(200).json(assessment);
});
router.get("/all", async (req, res) => {
  const assessment = await AssessmentsListsSchema.find().populate('account_id', '-password').exec(function (err, result) {
    if (err) throw err;
   // //console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
////console.log(req.body.zone)

const account= await AccountsSchema.findById(req.body.creator);
console.log(req.body.creator)
  const assessment = new AssessmentsListsSchema(
    {
      //patient_id: await PatientsSchema.findById(req.body.patient_id),
      //date: req.body.date,
      elementID:req.body.elementID,
      title: req.body.title,
      field:req.body.field,
      category: req.body.category,
      topic:req.body.topic,
      target: req.body.target,
      type:req.body.type,
      creator: await AccountsSchema.findById(req.body.creator),
     // creator: await AccountsSchema.findById(req.body.creator),
      description: req.body.description,
      documentation: req.body.documentation,
      audience: req.body.audience,
      state:req.body.state,
      ListBlocks:req.body.ListBlocks,
      created_at: Date(),
      updated_at: Date(),
    });
  state = await assessment.save();
  await UserSchema.findByIdAndUpdate(
    req.body.id,
    { $push: { assessments: state._id } },
    { new: true, useFindAndModify: false }
  ).populate('assessments').exec( function(err, result) {
    if (err) throw err;
    //console.log(result);
     res.status(200).json({result});
  }
  );
 
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })

});



/*  Register multi assessments*/
router.post('/registers', async function (req, res, next) {
  let assessments=[]
  const user =await AccountsSchema.findById(req.body.ListAssessments[0].creator)
req.body.ListAssessments.map((data,index)=>{
  assessments.push(
    {
      elementID:data.elementID,
      title: data.title,
      field:data.field,
      category: data.category,
      topic:data.topic,
      target: data.target,
      type:data.type,
      creator: user,
     // creator: await AccountsSchema.findById(data.creator),
      description: data.description,
      documentation: data.documentation,
      audience: data.audience,
      state:data.state,
      ListBlocks:data.ListBlocks,
      created_at: Date(),
      updated_at: Date(),
    });
  //  state = await block.save();
  })
    const Mblocks= AssessmentsList.insertMany(assessments).
    then((result)=>{
     console.log(result)
      res.status(200).json({ result });
       UserSchema.findByIdAndUpdate(
          req.body.userid,
          { $push: { assessments: result.map((e)=>e._id) } },
          { new: true, useFindAndModify: false }
        ).populate('assessmentslist').exec( function(err, result) {
          if (err) throw err;
          //console.log(result);
          // res.status(200).json({result});
          
        }
        );

    }).catch((err)=>{ if (err) throw err;})
    // await UserSchema.findByIdAndUpdate(
    //   req.body.id,
    //   { $push: { assessments: state._id } },
    //   { new: true, useFindAndModify: false }
    // ).populate('assessments').exec( function(err, result) {
    //   if (err) throw err;
    //   //console.log(result);
    //    res.status(200).json({result});
    // }
    // );
   
  // var etat = "not saved";
  // if (state != null) { etat = "data saved" }
  // res.status(200).json({ state, etat })

});
router.post("/removeassessment", async (req, res) => {
 // //console.log(req.body.item_id, req.body.creator)
  await AssessmentsListsSchema.deleteOne({ creator: req.body.creator,_id:req.body.assessment_id },).exec(async function(err, result) {
    if (err) throw err;
    const assessment = await AssessmentsListsSchema.find().populate('account_id', '-password').exec(function (err, result) {
      if (err) throw err;
     // //console.log(result);
      res.status(200).json({ result });
    }
    );
  }
  );
});
//////////
router.post("/update", async (req, res) => {
  ////console.log(req.body.assessment, req.body.id)
  await AssessmentsListsSchema.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      field:req.body.field,
      category: req.body.category,
      topic:req.body.topic,
      target: req.body.target,
      type:req.body.type,
      description: req.body.description,
      documentation: req.body.documentation,
      audience: req.body.audience,
      state:req.body.state,
      blocks:req.body.blocks,


     },
  
  ).exec( function(err, result) {
    if (err) throw err;
    //console.log(result);
     res.status(200).json({result});
  }
  );
});


router.post("/updatediags", async (req, res) => {
  ////console.log(req.body.assessment, req.body.id)
  await AssessmentsListsSchema.updateMany({"diagnosis": req.body.olddiag}, {"$set":{"diagnosis": req.body.newdiag}}).
  exec( function(err, result) {
    if (err) throw err;
    //console.log(result);
     res.status(200).json({result});
  }
  );
});
module.exports = router;