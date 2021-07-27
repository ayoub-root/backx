var express = require('express');
const { route } = require('.');
var router = express.Router();
const ComponentsSchema = require("../models/Components");
var AccountsSchema = require('../models/Accounts');
const Components = require('../models/Components');

router.get("/", async (req, res) => {
  const Item = await ComponentsSchema.find().populate('accounts');
  res.status(200).json(Item);
});
router.get("/all", async (req, res) => {
  const Item = await ComponentsSchema.find({state:'active'},).exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
  console.log(req.body.components)
  const Component = new ComponentsSchema(
    {

      creator: await AccountsSchema.findById(req.body.creator),
      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      widget:req.body.widget,
      type: req.body.type,
      state: req.body.state,
      value:JSON.stringify(req.body.value),
      options:req.body.options,
      documentation: req.body.documentation,
      description: req.body.description,
      created_at: Date(),
      updated_at: Date(),
    });
  state = await Component.save();
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })

});






router.post("/update", async (req, res) => {
  /// console.log(req.body.assessment, req.body.id)
  await ComponentsSchema.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      widget:req.body.widget,
      type: req.body.type,
      state: req.body.state,
      value:req.body.value,
      options:req.body.options,
      documentation: req.body.documentation,
      description: req.body.description,
    },

  ).exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});

router.post("/remove", async (req, res) => {
  //  console.log(req.body.item_id, req.body.creator)
  await ComponentsSchema.deleteOne({ creator: req.body.creator, _id: req.body.id },).exec(async function (err, result) {
    if (err) throw err;
    await ComponentsSchema.find({state:'active'}).exec(function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.status(200).json({ result });
    }
    );
  }
  );
});
//////////

router.post("/updatestate", async (req, res) => {
  /// console.log(req.body.assessment, req.body.id)
  await ComponentsSchema.findByIdAndUpdate(
    req.body.id,
    {
      
      state:req.body.state,
    },

  ).exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});

module.exports = router;