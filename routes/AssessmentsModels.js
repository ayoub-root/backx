var express = require('express');
var AccountsSchema= require('../models/Accounts');
var router = express.Router();

const AssessmentsModelsSchema = require("../models/AssessmentsModels");


router.post("/id", async (req, res) => {
  //////console.log(req.body.id)
  const assessment = await AssessmentsModelsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    ////////console.log(result);
    res.status(200).json({ result });
  }
  );
});

router.post("/getone", async (req, res) => {
  //////console.log(req.body.id)
  const assessment = await AssessmentsModelsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    ////////console.log(result);
    res.status(200).json({ result });
  }
  );
});

// router.post("/delete", async (req, res) => {
//   //////console.log(req.body.id)
//   const assessment = await PatientsSchema.findById(req.body.id).exec(function (err, result) {
//     if (err) throw err;
//     ////////console.log(result);
//     res.status(200).json({ result });
//   }
//   );
// });
//

router.get("/models", async (req, res) => {
  const assessment = await AssessmentsModelsSchema.find({type:'model'})//.populate('accounts');
  res.status(200).json(assessment);
});

router.post("/myassessments", async (req, res) => {
  const assessment = await AssessmentsModelsSchema.find({type:req.body.type,creator:req.body.creator})//.populate('accounts');
  res.status(200).json(assessment);
});

router.get("/", async (req, res) => {
  const assessment = await AssessmentsModelsSchema.find()//.populate('accounts');
  res.status(200).json(assessment);
});
router.get("/all", async (req, res) => {
  const assessment = await AssessmentsModelsSchema.find().populate('account_id', '-password').exec(function (err, result) {
    if (err) throw err;
   // //////console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
////////console.log(req.body.zone)

const account= await AccountsSchema.findById(req.body.creator);
//////console.log(req.body.ListBlocks)
  const assessment = new AssessmentsModelsSchema(
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
      description: req.body.description,
      documentation: req.body.documentation,
      audience: req.body.audience,
      state:req.body.state,
      valid:req.body.valid,
      ListBlocks:req.body.ListBlocks,
      created_at: Date(),
      updated_at: Date(),
    });
  result = await assessment.save();
 
  var etat = "not saved";
  if (result != null) { etat = "data saved" }
  res.status(200).json({ result, etat })

});

router.post("/removeassessment", async (req, res) => {
 // //////console.log(req.body.item_id, req.body.creator)
  await AssessmentsModelsSchema.deleteOne({ creator: req.body.creator,_id:req.body.assessment_id },).exec(async function(err, result) {
    if (err) throw err;
    const assessment = await AssessmentsModelsSchema.find().populate('account_id', '-password').exec(function (err, result) {
      if (err) throw err;
     // //////console.log(result);
      res.status(200).json({ result });
    }
    );
  }
  );
});
//////////
router.post("/update", async (req, res) => {
  ////////console.log(req.body.assessment, req.body.id)
  await AssessmentsModelsSchema.findByIdAndUpdate(
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
      valid:req.body.valid,
      ListBlocks:req.body.ListBlocks,


     },
  
  ).exec( function(err, result) {
    if (err) throw err;
    //////console.log(result);
     res.status(200).json({result});
  }
  );
});


router.post("/updatediags", async (req, res) => {
  ////////console.log(req.body.assessment, req.body.id)
  await AssessmentsModelsSchema.updateMany({"diagnosis": req.body.olddiag}, {"$set":{"diagnosis": req.body.newdiag}}).
  exec( function(err, result) {
    if (err) throw err;
    //////console.log(result);
     res.status(200).json({result});
  }
  );
});
module.exports = router;