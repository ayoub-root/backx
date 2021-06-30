var express = require('express');
const { route } = require('.');
var router = express.Router();
var AccountsSchema= require('../models/Accounts');
const EvaluationsSchema = require("../models/Evaluations");

router.get("/", async (req, res) => {
    const evaluation = await EvaluationsSchema.find().populate('accounts');
    res.status(200).json(evaluation);
});
router.get("/all", async (req, res) => {
    const evaluation = await EvaluationsSchema.find().populate('account_id', '-password').exec(function (err, result) {
        if (err) throw err;
      //  console.log(result);
        res.status(200).json({ result });
    }
    );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

    const evaluation = new EvaluationsSchema(
        {
            ref: req.body.ref,
            title: req.body.title,
            category: req.body.catigory,
            target: req.body.target,
            visiblity: req.body.visiblity,
            zone: req.body.zone,
            filter: req.body.filter,
            template: req.body.template,
            description: req.body.description,
            creator: await AccountsSchema.findById(req.body.creator),
            created_at: Date(),
            updated_at: Date(),
        });
        console.log(evaluation)
    state = await evaluation.save();
    var etat = "not saved";
    if (state != null) { etat = "data saved" }
    res.status(200).json({ state, etat })

});
module.exports = router;