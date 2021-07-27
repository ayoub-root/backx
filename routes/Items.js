var express = require('express');
const { route } = require('.');
var router = express.Router();
const ItemsSchema = require("../models/Items");
var AccountsSchema = require('../models/Accounts');

router.get("/", async (req, res) => {
  const Item = await ItemsSchema.find().populate('accounts');
  res.status(200).json(Item);
});
router.get("/all", async (req, res) => {
  const Item = await ItemsSchema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({ result });
  }
  );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {
  console.log(req.body.components)
  const Item = new ItemsSchema(
    {

      creator: await AccountsSchema.findById(req.body.creator),
      title: req.body.title,
      label: req.body.label,
      field: req.body.field,
      category: req.body.category,
      target: req.body.target,
      bodyzone: req.body.bodyzone,
      profession: req.body.profession,
      type: req.body.type,
      state: req.body.state,
      valid:req.body.valid,
      audience: req.body.audience,
      clonable: req.body.clonable,
      documentation: req.body.documentation,
      ListComponents: req.body.ListComponents,
      ListOptions:req.body.ListOptions,
      description: req.body.description,
      created_at: Date(),
      updated_at: Date(),
    });
  state = await Item.save();
  var etat = "not saved";
  if (state != null) { etat = "data saved" }
  res.status(200).json({ state, etat })

});

/*  Register new blocks*/
router.post('/registers', async function (req, res, next) {
  let items=[]
  const user =await AccountsSchema.findById(req.body.ListItems[0].creator)
req.body.ListItems.map((data,index)=>{
  items.push(
    {

      creator: user,
      title: data.title,
      label: data.label,
      field: data.field,
      category: data.category,
      target: data.target,
      bodyzone: data.bodyzone,
      profession: data.profession,
      type: data.type,
      state: data.state,
      valid:data.valid,
      audience: data.audience,
      clonable: data.clonable,
      documentation: data.documentation,
      ListComponents: data.ListComponents,
      ListOptions:data.ListOptions,
      description: data.description,
      created_at: Date(),
      updated_at: Date(),
    });
  //  state = await block.save();
  })
    const MItems= ItemsSchema.insertMany(items).
    then((result)=>{
     
      res.status(200).json({ result });

    }).catch((err)=>{ if (err) throw err;})
    
   
  // var etat = "not saved";
  // if (state != null) { etat = "data saved" }
  // res.status(200).json({ state, etat })

});


router.post("/removeitem", async (req, res) => {
  //  console.log(req.body.item_id, req.body.creator)
  await ItemsSchema.deleteOne({ creator: req.body.creator, _id: req.body.item_id },).exec(async function (err, result) {
    if (err) throw err;
    await ItemsSchema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
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
  /// console.log(req.body.assessment, req.body.id)
  await ItemsSchema.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      label: req.body.lable,
      field: req.body.filed,
      category: req.body.category,
      target: req.body.target,
      bodyzone: req.body.bodyzone,
      profession: req.body.profession,
      type: req.body.type,
      state: req.body.state,
      valid:req.body.valid,
      audience: req.body.audience,
      clonable: req.body.clonable,
      documentation: req.body.documentation,
      ListComponents: req.body.ListComponents,
      ListOptions:req.body.ListOptions,
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
    console.log(req.body.id, req.body.creator)
  await ItemsSchema.deleteOne({ creator: req.body.creator, _id: req.body.id },).exec(async function (err, result) {
    if (err) throw err;
    await ItemsSchema.find({state:'active'}).exec(function (err, result) {
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
  await ItemsSchema.findByIdAndUpdate(
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