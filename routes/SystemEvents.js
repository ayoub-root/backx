var express = require('express');
var AccountsSchema = require('../models/Accounts');
var router = express.Router();
const EvaluationsSchema = require("../models/Evaluations");
const SystemEventsSchema = require("../models/SystemEvents");
const Patients = require('../models/Patients');

router.post("/id", async (req, res) => {
  console.log(req.body.id)
  const assessment = await SystemEventsSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).json({ result });
  }
  );
});

router.post("/getone", async (req, res) => {
  console.log(req.body.id)
  const assessment = await SystemEventsSchema.findById(req.body.id).exec(function (err, result) {
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
  const assessment = await SystemEventsSchema.find({ type: 'model' })//.populate('accounts');
  res.status(200).json(assessment);
});

router.post("/myassessments", async (req, res) => {
  const assessment = await SystemEventsSchema.find({ type: req.body.type, creator: req.body.creator })//.populate('accounts');
  res.status(200).json(assessment);
});

router.get("/", async (req, res) => {
  const assessment = await SystemEventsSchema.find()//.populate('accounts');
  res.status(200).json(assessment);
});
router.get("/all", async (req, res) => {
  const assessment = await SystemEventsSchema.find().populate('account_id', '-password').exec(function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
  //console.log(req.body.zone)

  const account = await AccountsSchema.findById(req.body.creator);
  console.log(req.body.blocks)
  const assessment = new SystemEventsSchema(
    {
      //patient_id: await PatientsSchema.findById(req.body.patient_id),
      //date: req.body.date,

      title: req.body.title,
      type: req.body.type,
      creator: await AccountsSchema.findById(req.body.creator),
      interestDataId=req.body.interstDataId,
      interestDataType=req.body.interstDataType,
      interestDataValue=req.body.interstDataValue,
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
  await SystemEventsSchema.deleteOne({ creator: req.body.creator, _id: req.body.assessment_id },).exec(async function (err, result) {
    if (err) throw err;
    const assessment = await SystemEventsSchema.find().populate('account_id', '-password').exec(function (err, result) {
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
  await SystemEventsSchema.findByIdAndUpdate(
    req.body.id,
    {
     
      title: req.body.title,
      type: req.body.type,
      creator: await AccountsSchema.findById(req.body.creator),
      interestDataId=req.body.interstDataId,
      interestDataType=req.body.interstDataType,
      interestDataValue=req.body.interstDataValue,
    },

  ).exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});


router.post("/updatediags", async (req, res) => {
  //console.log(req.body.assessment, req.body.id)
  await SystemEventsSchema.updateMany({ "diagnosis": req.body.olddiag }, { "$set": { "diagnosis": req.body.newdiag } }).
    exec(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json({ result });
    }
    );
});
module.exports = router;