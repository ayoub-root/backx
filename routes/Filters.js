var express = require('express');
const { route } = require('.');
var router = express.Router();
const AccountsSchema =require('../models/Accounts');
const FiltersSchema = require("../models/Filters");

router.get("/", async (req, res) => {
    const Filter = await FiltersSchema.find().populate('accounts');
    res.status(200).json(patient);
});
router.get("/all", async (req, res) => {
    const Filter = await FiltersSchema.find().populate('account_id', '-password').exec(function (err, result) {
        if (err) throw err;
       // console.log(result);
        res.status(200).json({ result });
    }
    );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

    const Filter = new FiltersSchema(
        {
            creator: await AccountsSchema.findById(req.body.creator),
            title: req.body.title,
            description:req.body.description,
            field:req.body.field,
            type:req.body.type,
            value:req.body.value,
            created_at: Date(),
            updated_at: Date(),
        });
    state = await Filter.save();
    var etat = "not saved";
    if (state != null) { etat = "data saved" }
    res.status(200).json({ state, etat })

});
router.post("/removefilter", async (req, res) => {
    //  console.log(req.body.item_id, req.body.creator)
      await FiltersSchema.deleteOne({ creator: req.body.creator,_id:req.body.id },).exec(async function(err, result) {
        if (err) throw err;
        await FiltersSchema.find().exec(function (err, result) {
          if (err) throw err;
         // console.log(result);
          res.status(200).json({ result });
      }
      );
      }
      );
    });



    router.post("/update", async (req, res) => {
        /// console.log(req.body.assessment, req.body.id)
         await FiltersSchema.findByIdAndUpdate(
           req.body.id,
           
           { $push: { option: req.body.option  } },
           { new: true, useFindAndModify: false }
         
         ).exec( function(err, result) {
           if (err) throw err;
         //  console.log(result);
            res.status(200).json({result});
         }
         );
       });
module.exports = router;