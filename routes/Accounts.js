var express = require('express');
const { route } = require('.');
var router = express.Router();
var middleware = require('../middleware/middleware')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var AccountSchema = require('../models/Accounts');
var UserSchema = require('../models/Users');
var ProfessionalSchema = require('../models/Professionals');
//const session = require('express-session'); //we're using 'express-session' as 'session' here
var shortid = require('shortid');
const Accounts = require('../models/Accounts');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const multer = require('multer');
const { path } = require('../app');
/* GET accounts listing. */
// router.all('/', async function(req, res, next) {
// var d= req.session.account.email;
//   //var data=await AccountSchema.find()
//  await res.json({b:d});
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = (file.originalname.match(/\.+[\S]+$/) || [])
    const uniqueid = middleware.Unique_N_ID();
    const newname = file.fieldname + '-' + uniqueid + fileExtension
    cb(null, newname).then(() => { return uniqueid })
  }
})

router.post("/id", async (req, res) => {
  ////console.log(req.body.id)
  const account = await AccountSchema.findById(req.body.id, 'email code first_name last_name date_of_birth avatar role profession created_at', (err, result) => {
    if (err) throw err;
    ////console.log(result);
    res.status(200).json({ result });
  }
  );

});

router.get("/", auth, async (req, res) => {
  const account = await AccountSchema.findById(req.account);
  res.status(200).json({
    email: account.email,
    id: account._id,
    role: account.role,
    avatar: account.avatar,
    profession:account.profession,
  });
});
router.get("/all", async (req, res) => {
  const account = await AccountSchema.find({}, 'email code sex first_name last_name date_of_birth avatar role profession created_at', (err, result) => {
    if (err) throw err;
    ////console.log(result);
    res.status(200).json({ result });
  }
  );

});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

router.post('/checkemail', async (req, res) => {
  // //console.log(req.body.account)
  if (req.body.email!=undefined) {
    const account = await AccountSchema.findOne({ email:req.body.email  }, ' email');
    if (account) {
      return res.status(200).json({msg:"utilisateur deja exist.",code:true});
    }
    else {
      return res.status(200).json({msg:'correcte',code:false})
    }

  }
 

})


//var upload = multer({ storage: storage });

/*  Register new Acoount*/
router.post('/register', async function (req, res, next) {

  const uniqueid = middleware.Unique_N_ID();
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/accounts/')
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExtension = (file.originalname.match(/\.+[\S]+$/) || [])

      const newname = file.fieldname + '-' + uniqueid + fileExtension
      // //console.log(newname)
      cb(null, newname)
    }
  })

  let upload = multer({ storage: storage, newname: uniqueid, fileFilter: imageFilter }).single('avatar');
  let newname = "";
  upload(req, res, async function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.file!=undefined){
    newname = req.file.filename} else{
      newname="avatar"+req.body.sex+'.png'
    }

    // Display uploaded image for user validation
    //console.log( req.body)
    const account = new AccountSchema(
      { 
        administrator:await  AccountSchema.findById(req.body.administrator),
        code: uniqueid,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 5),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.birth,
        sex: req.body.sex,
        address: req.body.address,
        mobile: req.body.mobile,
        avatar: newname,//"avatar-"+uniqueid+".png" ,
        NIR_number: req.body.NIR_number,
        role: req.body.role,
        profession:req.body.profession,
        bio: req.body.bio,
        is_active: false,
        activation_code: middleware.Unique_N_ID() + "" + middleware.Unique_N_ID(),
        is_loged: false,
        created_at: Date(),
        updated_at: Date(),
      });
    state = await account.save();
    if (req.body.creator === "healthpro") {
      if (req.body.role === "healthpro") {
        const professional  = new ProfessionalSchema(
          {
              account_id: await  AccountSchema.findById(state._id) ,
              address:'' ,
              mobile:''  ,
              job:'' ,
              administrator:await  AccountSchema.findById(state.administrator),
              adder:await  AccountSchema.findById(req.body.adder),
              description:'' ,
              is_active:false,
              added_by_admin:false,
              activation_code:middleware.Unique_N_ID()+""+middleware.Unique_N_ID(),
              created_at:Date(),
              updated_at:Date(),
          });
  await professional.save();

      } else if (req.body.role === "patient") {
        console.log(state.administrator)
        const user  = new UserSchema(
          {
             account_id:await  AccountSchema.findById(state._id), 
             information:'',
             administrator:await  AccountSchema.findById(state.administrator),
              is_active:false,
              activation_code:middleware.Unique_N_ID()+""+middleware.Unique_N_ID(),
              created_at:Date(),
              updated_at:Date(),
          });
  await user.save();
      }
    }
    if (req.body.creator === "admin") {

      if (req.body.role === "healthpro") {
        const professional  = new ProfessionalSchema(
          {
              account_id: await  AccountSchema.findById(state._id) ,
              address:'' ,
              mobile:''  ,
              job:'' ,
              administrator:await  AccountSchema.findById(state.administrator),
              description:'' ,
              is_active:false,
              added_by_admin:true,
              activation_code:middleware.Unique_N_ID()+""+middleware.Unique_N_ID(),
              created_at:Date(),
              updated_at:Date(),
          });
  await professional.save();

      } else if(req.body.role === "admin"){
        await  (await AccountSchema.findByIdAndUpdate(state._id,{role:'admin'})).save()
      } 
    } 
    if (req.body.creator === "myself") {
      if (req.body.role === "healthpro") {
        const professional  = new ProfessionalSchema(
          {
              account_id: await  AccountSchema.findById(state._id) ,
              address:'' ,
              mobile:''  ,
              job:'' ,
              description:'' ,
              administrator:await  AccountSchema.findById(state.administrator),
              is_active:false,
              added_by_admin:false,
              activation_code:middleware.Unique_N_ID()+""+middleware.Unique_N_ID(),
              created_at:Date(),
              updated_at:Date(),
          });
  await professional.save();

      } 
    }
    

    
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      res.status(200).json({ state: state, etat: "Please select an image to upload" });
     
    }
    else if (err instanceof multer.MulterError) {
      res.status(200).json({ state: state, etat: err });
    }
    else if (err) {
      res.status(200).json({ state: state, etat: err });
    }
    else res.status(200).json({ state: state, etat: "data saved" });

  });


});

router.post('/updateaccount', async (req, res) => {

  if(req.body.role === "admin"){
    await  (await AccountSchema.findByIdAndUpdate(req.body.account_id,{role:req.body.role})).save()
  
} 
if(req.body.role === "healthpro"){
  await  (await AccountSchema.findByIdAndUpdate(req.body.account_id,{role:req.body.role})).save()

} 
})

router.post('/existaccount', async (req, res) => {
  // //console.log(req.body.account)
  if (!isNaN((req.body.account))) {
    const account = await AccountSchema.findOne({ code: parseInt(req.body.account) }, '_id email first_name last_name');
    if (!account) {
      return res
        .status(401)
        .json("No account with this code has been registered.");
    }
    else {
      res.status(200).json(account)
    }

  }
  else {
    return res
      .status(400)
      .json({ msg: "code inccorect" });
  }

})
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const account = await AccountSchema.findOne({ email: email });
    if (!account)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: account._id }, process.env.JWT_TOKEN);
    res.json({
      token:token,
      email: account.email,
      firstname:account.first_name,
      lastname:account.last_name,
      code:account.code,
      id: account._id,
      role: account.role,
      avatar: account.avatar,
      profession:account.profession,
      bio:account.bio,
      address:account.address,
      mobile:account.mobile,
     
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/*  update account role  */
router.post("/tokenIsValidss", async (req, res) => {

});

/* token verification  */
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    //console.log(token)
    if (!token) return res.json(false);

    const verified = jwt.verify(JSON.parse(token), process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const account = await AccountSchema.findById(verified.id);
    if (!account) return //res.json(true);
    res.status(200).json({
      email: account.email,
      firstname:account.first_name,
      lastname:account.last_name,
      code:account.code,
      id: account._id,
      role: account.role,
      avatar: account.avatar,
      profession:account.profession,
      bio:account.bio,
      address:account.address,
      mobile:account.mobile,

    });

   // return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/*  logout account */
router.all('/logout', (req, res) => {
  delete req.session.account; // any of these works
  req.session.destroy(); // any of these works
  res.status(200).send('logout successful')
})

/*  Password reset  */
router.post('/forgot', (req, res) => {
  let { email } = req.body; // same as let email = req.body.email
  User.findOne({ email: email }, (err, userData) => {
    if (!err) {
      userData.passResetKey = shortid.generate();
      userData.passKeyExpires = new Date().getTime() + 20 * 60 * 1000 // pass reset key only valid for 20 minutes
      userData.save().then(err => {
        if (!err) {
          // configuring smtp transport machanism for password reset email
          let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
              user: 'ayoub.inf30@gmail.com', // your gmail address
              pass: '' // your gmail password
            }
          });
          let mailOptions = {
            subject: `NodeAuthTuts | Password reset`,
            to: "ayoub.inf30@gmail.com",
            from: `NodeAuthTuts <ayoub.inf300@gmail.com>`,
            html: `
                <h1>Hi,</h1>
                <h2>Here is your password reset key</h2>
                <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${passResetKey}</code></h4>
                <p>Please ignore if you didn't try to reset your password on our platform</p>
              `
          };
          try {
            transporter.sendMail(mailOptions, (error, response) => {
              if (error) {
                //console.log("error:\n", error, "\n");
                res.status(500).send("could not send reset code");
              } else {
                //console.log("email sent:\n", response);
                res.status(200).send("Reset Code sent");
              }
            });
          } catch (error) {
            //console.log(error);
            res.status(500).send("could not sent reset code");
          }
        }
      })
    } else {
      res.status(400).send('email is incorrect');
    }
  })
});



/* reset password */
router.post('/resetpass', (req, res) => {
  let { resetKey, newPassword } = req.body
  AccountSchema.find({ passResetKey: resetKey }, (err, userData) => {
    if (!err) {
      let now = new Date().getTime();
      let keyExpiration = userDate.passKeyExpires;
      if (keyExpiration > now) {
        userData.password = bcrypt.hashSync(newPassword, 5);
        userData.passResetKey = null; // remove passResetKey from user's records
        userData.keyExpiration = null;
        userData.save().then(err => { // save the new changes
          if (!err) {
            res.status(200).send('Password reset successful')
          } else {
            res.status(500).send('error resetting your password')
          }
        })
      } else {
        res.status(400).send('Sorry, pass key has expired. Please initiate the request for a new one');
      }
    } else {
      res.status(400).send('invalid pass key!');
    }
  })
})


/* account activation via email */

router.get("/activation", function (req, rep, next) {

  AccountSchema.findOne({}).
    then((data) => {

    }).catch(err => {

    });

});



router.post("/removeaccount", async (req, res) => {
  //console.log(req.body.account_id, req.body.creator)
  await AccountSchema.deleteOne({ creator: req.body.creator,_id:req.body.account_id },).exec( function(err, result) {
    if (err) throw err;
    ////console.log(result);
     res.status(200).json({result});
  }
  );
});
//////////
module.exports = router;
