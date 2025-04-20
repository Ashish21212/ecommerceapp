const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


// register
const registerUser = async(req,res) => {
  const {userName, email, password} = req.body;

  try{
     
   const hashPassword = await bcrypt.hash(password, 10);
   const newUser = new User({
      userName,
      email,
      password: hashPassword
   })
   await newUser.save();
   res.status(200).json({
    success: true,
    message: "User Created Successfully"
   })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }


}
// Login
const login = async(req,res) => {
  const {email, password} = req.body;

  try{

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }


}

module.exports ={registerUser}