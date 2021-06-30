var express = require('express');
const { route } = require('.');
var router = express.Router();
const NotesSchema = require("../models/Notes");

router.get("/", async (req, res) => {
    const Note = await NotesSchema.find().populate('accounts');
    res.status(200).json(patient);
});
router.get("/all", async (req, res) => {
    const Note = await Schema.find().populate('account_id', '-password').populate('doctor', '-password').exec(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ result });
    }
    );
});



/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

    const Note = new NotesSchema(
        {
            account_id: await AccountSchema.findById(req.body.account_id),
            evaluation: await EvaluationsSchema.findById(req.body.evaluation),
            creator: await AccountSchema.findById(req.body.account_id),
            title: req.body.title,
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