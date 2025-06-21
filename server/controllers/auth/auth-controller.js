const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
        
        
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
   
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    console.log(checkUser);
    if (!checkUser) {
      return res.status(401).json({ 
        success: false,
        message: "User Not Found",
      });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Login Success",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Logout
const logoutUser =async(req,res)=>{
  res.clearCookie('token').json({
    success: true,
    message: "Logout Successfully",
  })
}

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    })
    
  }
  try{
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  }catch(error){
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    })
  }

}


module.exports = { registerUser, loginUser, logoutUser,authMiddleware };
