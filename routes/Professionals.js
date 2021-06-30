var express = require('express');
const { route } = require('.');
var router = express.Router();
var middleware = require('../middleware/middleware')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var ProfessionalSchema = require('../models/Professionals');
//const session = require('express-session'); //we're using 'express-session' as 'session' here
var shortid = require('shortid');

const AccountSchema =require('../models/Accounts')
const jwt = require('jsonwebtoken')
 const auth = require('../middleware/auth')
/* GET professionals listing. */
// router.all('/', async function(req, res, next) {
// var d= req.session.professional.email;
//   //var data=await ProfessionalSchema.find()
//  await res.json({b:d});
// });

router.get("/", async (req, res) => {
  const pro = await ProfessionalSchema.find().populate('accounts');
  res.status(200).json(patient);
});
router.get("/all", async (req, res) => {
  const pro = await ProfessionalSchema.find().populate('account_id','-password')  .exec( function(err, result) {
    if (err) throw err;
    console.log(result);
     res.status(200).json({result});
  }
  );
});

router.post('/checkhealthpro', async function(req,res,next){
  console.log(req.body)
if (req.body.id!=undefined){

  const healthpro = await ProfessionalSchema.findOne({account_id:req.body.id,adder:req.body.adder});
 if(healthpro){
 return res.status(200).json({msg:"healthpro exist deja",code:true});
 }else{
   
    return res.status(200).json({msg:"good",code:false});
  }
  
}

})
/*  Register new Acoount*/
router.post('/register', async function(req,res, next){
  console.log(req.body)
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
 } else {
  //shortid.characters('0123456789012345678901234567890123456789012345678901234567890123');
  //console.log(shortid.generate())
  const professional  = new ProfessionalSchema(
         {
             account_id: await  AccountSchema.findById(req.body.account_id) ,
             address:'' ,
             mobile:''  ,
             job:''  ,
             description:'' ,
             adder:await  AccountSchema.findById(req.body.adder) ,
             is_active:false,
             added_by_admin:req.body.added_by_admin,
             activation_code:middleware.Unique_N_ID()+""+middleware.Unique_N_ID(),
             state:req.body.state,
             created_at:Date(),
             updated_at:Date(),
         });
 state= await professional.save();
 await  (await AccountSchema.findByIdAndUpdate(req.body.account_id,{role:'healthpro'})).save()
 var etat="not saved";
 if(state!=null){etat="data saved"}
 res.status(200).json({state:state,etat:etat})
    }

    
});



/* professional activation via email */

router.get("/activation",function(req,rep, next){

ProfessionalSchema.findOne({}).
then((data)=>{

}).catch(err=>{

});

});

module.exports = router;
