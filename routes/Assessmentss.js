var express = require('express');
var AccountsSchema= require('../models/Accounts');
var router = express.Router();
const EvaluationsSchema = require("../models/Evaluations");
const AssessmentsSchema = require("../models/Assessmentss");

router.post("/id", async (req, res) => {
  console.log(req.body.id)
  const assessment = await AssessmentsSchema.findById(req.body.id).populate('evaluations').exec(function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.status(200).json({ result });
  }
  );
});


//
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

  const assessment = new AssessmentsSchema(
    {
      //patient_id: await PatientsSchema.findById(req.body.patient_id),
      //date: req.body.date,
      ref: req.body.ref,
      title: req.body.title,
      category: req.body.catigory,
      target: req.body.target,
      visiblity: req.body.visiblity,
      zone: req.body.zone,
      filter: req.body.filter,
      creator: await AccountsSchema.findById(req.body.creator),
      description: req.body.description,
      objective: req.body.objective,
      iditable:req.body.editable,
      //evaluations:await EvaluationsSchema.findByIdAndUpdate(req.body.evaluations),
      created_at: Date(),
      updated_at: Date(),
    });
  state = await assessment.save();
  await AssessmentsSchema .findByIdAndUpdate(
    state._id,
    { $push: { evaluations: req.body.evaluations } },
    { new: true, useFindAndModify: false }
  );
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })

});

module.exports = router;