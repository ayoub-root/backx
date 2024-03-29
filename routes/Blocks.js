var express = require('express');
const { route } = require('.');
var router = express.Router();
const BlocksSchema = require("../models/Blocks");
const AccountsSchema = require('../models/Accounts');
const Blocks = require('../models/Blocks');

router.get("/", async (req, res) => {
  const block = await BlocksSchema.find().populate('accounts');
  res.status(200).json(block);
});
router.get("/all", async (req, res) => {
  const block = await BlocksSchema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
    if (err) throw err;
    // ////console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

  const block = new BlocksSchema(
    {
      elementID:req.body.elementID,
      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      ListItems: req.body.ListItems,
      subblocks: req.body.subblocks,
      creator: await AccountsSchema.findById(req.body.creator),
      ref: req.body.ref,
      category: req.body.category,
      type:req.body.type,
      target:req.body.target,
      profession: req.body.profession,
      state: req.body.state, 
      valid:req.body.valid,
      audience: req.body.audience,
      documentation:req.body.documentation,
      description: req.body.description,
      created_at: Date(),
      updated_at: Date(),
    });
  state = await block.save();
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })

});

/*  Register new blocks*/
router.post('/registers', async function (req, res, next) {
  let blocks=[]
  const user =await AccountsSchema.findById(req.body.creator)
req.body.ListBlocks.map((data,index)=>{
  blocks.push(
    {
      elementID:data.elementID,
      title: data.title,
      label: data.label,
      field: data.field,
      ListItems: data.ListItems,
      subblocks: data.subblocks,
      creator:  user,
      ref: data.ref,
      category: data.category,
      type:data.type,
      target:data.target,
      profession: data.profession,
      state: data.state, 
      valid:data.valid,
      audience: data.audience,
      documentation:data.documentation,
      description: data.description,
      created_at: Date(),
      updated_at: Date(),
    });
  //  state = await block.save();
  })
    const Mblocks= BlocksSchema.insertMany(blocks).
    then((result)=>{
     
      res.status(200).json({ result });

    }).catch((err)=>{ if (err) throw err;})
    
   
  // var etat = "not saved";
  // if (state != null) { etat = "data saved" }
  // res.status(200).json({ state, etat })

});

router.post("/removeblock", async (req, res) => {
  //  ////console.log(req.body.item_id, req.body.creator)
  await BlocksSchema.deleteOne({ creator: req.body.creator, _id: req.body.block_id },).exec(async function (err, result) {
    if (err) throw err;
    await BlocksSchema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
      if (err) throw err;
      // ////console.log(result);
      res.status(200).json({ result });
    }
    );
  }
  );
});

//////////


router.post("/update", async (req, res) => {
  ////console.log(req.body.assessment, req.body.id)
  await BlocksSchema.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      ListItems: req.body.ListItems,
      subblocks: req.body.subblocks,
      creator: await AccountsSchema.findById(req.body.creator),
      ref: req.body.ref,
      category: req.body.category,
      type:req.body.type,
      target:req.body.target,
      profession: req.body.profession,
      state: req.body.state, 
      valid:req.body.valid,
      audience: req.body.audience,
      documentation:req.body.documentation,
      description: req.body.description,
      
    },

  ).exec(function (err, result) {
    if (err) throw err;
   // ////console.log(result);
    res.status(200).json({ result });
  }
  );
});
//////////



router.post("/remove", async (req, res) => {
  //  ////console.log(req.body.item_id, req.body.creator)
  await BlocksSchema.deleteOne({ creator: req.body.creator, _id: req.body.id },).exec(async function (err, result) {
    if (err) throw err;
    await BlocksSchema.find({state:'active'}).exec(function (err, result) {
      if (err) throw err;
      // ////console.log(result);
      res.status(200).json({ result });
    }
    );
  }
  );
});
//////////

router.post("/updatestate", async (req, res) => {
  /// ////console.log(req.body.assessment, req.body.id)
  await BlocksSchema.findByIdAndUpdate(
    req.body.id,
    {
      
      state:req.body.state,
    },

  ).exec(function (err, result) {
    if (err) throw err;
    ////console.log(result);
    res.status(200).json({ result });
  }
  );
});


module.exports = router;