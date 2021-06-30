var express = require('express');
const { route } = require('.');
var router = express.Router();
const ProfessionsSchema = require("../models/Professions");
const AccountsSchema = require('../models/Accounts');
router.get("/", async (req, res) => {
    const Note = await ProfessionsSchema.find();
    res.status(200).json(patient);
});
router.get("/all", async (req, res) => {
    const Note = await ProfessionsSchema.find().exec(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ result });
    }
    );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

    const Note = new ProfessionsSchema(
        {
           creator: await AccountsSchema.findById(req.body.account_id),
            title: req.body.title,
            label:req.body.label,
            description:req.body.description,
            created_at: Date(),
            updated_at: Date(),
        });
    state = await Note.save();
    var etat = "not saved";
    if (state != null) { etat = "data saved" }
    res.status(200).json({ state, etat })

});


module.exports = router;