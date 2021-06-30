var express = require('express');

const middleware = require('../middleware/middleware');
var AccountsSchema= require('../models/Accounts');
var router = express.Router();
const EvaluationsSchema = require("../models/Evaluations");
const ExercisesSchema = require("../models/Exercises");
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = (file.originalname.match(/\.+[\S]+$/) || [])
    const uniqueid=middleware.Unique_N_ID();
    const newname= file.fieldname + '-' + uniqueid+fileExtension
    cb(null,newname).then(()=>{return uniqueid})
  }
})
router.post("/id", async (req, res) => {
  console.log(req.body.id)
  const Exercise = await ExercisesSchema.findById(req.body.id).exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});


//
router.get("/", async (req, res) => {
  const Exercise = await ExercisesSchema.find()//.populate('accounts');
  res.status(200).json(Exercise);
});
router.get("/all", async (req, res) => {
  const Exercise = await ExercisesSchema.find().populate('account_id', '-password').exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(MP4|mp4|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
console.log(req.body)
  const uniqueid=middleware.Unique_N_ID();
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/exercises/')
    },
    filename: function (req, file, cb) {
     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExtension = (file.originalname.match(/\.+[\S]+$/) || [])
 
      const newname= file.fieldname + '-' + uniqueid+fileExtension
      console.log(newname)
      cb(null,newname)
    }
  })
 
  let upload = multer({ storage: storage,newname:uniqueid, fileFilter: imageFilter }).single('exercisefile');
 let newname="";
  upload(req, res, async function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
           res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
           res.send(err);
      }
      else if (err) {
           res.send(err);
      }
newname=req.file.filename
  const Exercise = new ExercisesSchema(
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
      exercisefile:newname,
      creator: await AccountsSchema.findById(req.body.creator),
      description: req.body.description,
      objective: req.body.objective,
  
      //evaluations:await EvaluationsSchema.findByIdAndUpdate(req.body.evaluations),
      created_at: Date(),
      updated_at: Date(),
    });
  state = await Exercise.save();
 
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })
  });
});

module.exports = router;