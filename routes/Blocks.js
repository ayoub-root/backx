var express = require('express');
const { route } = require('.');
var router = express.Router();
const blocksSchema = require("../models/Blocks");
const AccountsSchema = require('../models/Accounts');

router.get("/", async (req, res) => {
  const block = await blocksSchema.find().populate('accounts');
  res.status(200).json(block);
});
router.get("/all", async (req, res) => {
  const block = await blocksSchema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

  const block = new blocksSchema(
    {

      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      items: req.body.items,
      subblocks: req.body.subblocks,
      creator: await AccountsSchema.findById(req.body.creator),
      ref: req.body.ref,
      category: req.body.category,
      type:req.body.type,
      target:req.body.target,
      profession: req.body.profession,
      state: req.body.state, 
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



router.post("/removeblock", async (req, res) => {
  //  console.log(req.body.item_id, req.body.creator)
  await blocksSchema.deleteOne({ creator: req.body.creator, _id: req.body.block_id },).exec(async function (err, result) {
    if (err) throw err;
    await blocksSchema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
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
  console.log(req.body.assessment, req.body.id)
  await blocksSchema.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      items: req.body.items,
      subblocks: req.body.subblocks,
      creator: await AccountsSchema.findById(req.body.creator),
      ref: req.body.ref,
      category: req.body.category,
      type:req.body.type,
      target:req.body.target,
      profession: req.body.profession,
      state: req.body.state, 
      audience: req.body.audience,
      documentation:req.body.documentation,
      description: req.body.description,
      
    },

  ).exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});
//////////

module.exports = router;