var express = require('express');
const { route } = require('.');
var router = express.Router();
var middleware = require('../middleware/middleware')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var UserSchema = require('../models/Users');
var AccountSchema =require('../models/Accounts')
//const session = require('express-session'); //we're using 'express-session' as 'session' here
var shortid = require('shortid');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken')
 const auth = require('../middleware/auth')
 const AssessmentsSchema = require("../models/Assessments");
const { db } = require('../models/Assessments');
/* GET users listing. */
// router.all('/', async function(req, res, next) {
// var d= req.session.user.email;
//   //var data=await UserSchema.find()
//  await res.json({b:d});
// });

router.get("/", async (req, res) => {
  const user = await UserSchema.find().populate('accounts');
  res.status(200).json(user);
});
router.get("/all", async (req, res) => {
  const user = await UserSchema.find().populate('account_id','-password').populate('administrator','-password').exec( function(err, result) {
    if (err) throw err;
    //console.log(result);
     res.status(200).json({result});
  }
  );
});

router.post("/diagno", async (req, res) => {
  ////console.log(req.body.id)
  const user = await UserSchema.findById(req.body.id,'_id assessments').populate({path:'assessments',select:'diagnosis'}).exec( function(err, result) {
    if (err) throw err;
  //  console.log(result);
  //let c=AssessmentsSchema.find().distinct('diagnosis')
     res.status(200).json(result);
  }
  );
});
router.post("/assessmentslist", async (req, res) => {
  ////console.log(req.body.id)
  const user = await UserSchema.findById(req.body.id,'_id assessments').populate('assessmentslist').exec( function(err, result) {
    if (err) throw err;
   // //console.log(result);
     res.status(200).json({result});
  }
  );
});

router.post("/assessments", async (req, res) => {
  //console.log(req.body.id)
  const user = await UserSchema.find({account_id:req.body.id.id},'_id assessments').populate('assessments').exec( function(err, result) {
    if (err) throw err;
    //console.log(result);
     res.status(200).json({result});
  }
  );
});

router.post("/addassessment", async (req, res) => {
  //console.log(req.body.assessment, req.body.id)
  await UserSchema.findByIdAndUpdate(
    req.body.id,
    { $push: { assessments: req.body.assessment } },
    { new: true, useFindAndModify: false }
  ).populate('assessments').exec( function(err, result) {
    if (err) throw err;
    //console.log(result);
     res.status(200).json({result});
  }
  );
});

//////
router.post("/removeassessment", async (req, res) => {
  //console.log(req.body.assessment_id, req.body.user_id)
  await UserSchema.findByIdAndUpdate(
    req.body.user_id,
    { $pull: { assessments: req.body.assessment_id } },
    { new: true, useFindAndModify: false }
  ).populate('assessments').exec( function(err, result) {
    if (err) throw err;
    ////console.log(result);
     res.status(200).json({result});
  }
  );
});
//////////
router.post("/id", async (req, res) => { 
 // //console.log(req.body.id+"ééééééééééé")
   await UserSchema.findById(req.body.id).populate('account_id','-password').populate('administrator','-password').exec( function(err, result) {
    if (err) throw err;
   ////console.log(req.body.id+"kkkkkkkkkkk");
     res.status(200).json({result});
  }
  );
});
 
router.post('/checkuser', async function(req,res,next){
  //console.log(req.body)
if (req.body.id!=undefined){

  const user = await UserSchema.findOne({account_id:req.body.id,administrator:req.body.administrator});
 if(user){
 return res.status(200).json({msg:"user exist deja",code:true});
 }else{
   
    return res.status(200).json({msg:"good",code:false});
  }
  
}

})

/*  Register new Acoount*/
router.post('/register', async function(req,res, next){
 // //console.log(req.body)
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
 } else {
  //shortid.characters('0123456789012345678901234567890123456789012345678901234567890123');
  ////console.log(shortid.generate())
  const user  = new UserSchema(
         {
            account_id: await  AccountSchema.findById(req.body.account_id), 
            information:'',
            administrator:await  AccountSchema.findById(req.body.administrator),
             is_active:false,
             activation_code:middleware.Unique_N_ID()+""+middleware.Unique_N_ID(),
             state:req.body.state,
             created_at:Date(),
             updated_at:Date(),
         });
 state= await user.save();
 await  (await AccountSchema.findByIdAndUpdate(req.body.account_id,{role:'patient'})).save()
 var etat="not saved";
 if(state!=null){etat="data saved"}
 res.status(200).json({state,etat})
    }

    
});

router.post('/existuser',async(req,res)=>{
  //console.log(req.body.user)
  if (!isNaN((req.body.user))){
  const user = await UserSchema.findOne({ code: parseInt(req.body.user) },'_id email first_name last_name');
  if (!user){
    return res
      .status(401)
      .json("No user with this code has been registered." );}
      else{
   res.status(200).json(user)}
   
      }
      else{
        return res
      .status(400)
      .json({ msg: "code inccorect" });
      }

    });



/* user activation via email */

router.get("/activation",function(req,rep, next){

UserSchema.findOne({}).
then((data)=>{

}).catch(err=>{

});

});

module.exports = router;
