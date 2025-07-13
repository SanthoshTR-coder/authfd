const jwt=require('jsonwebtoken');
const User= require('../models/userModels');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.SECRETKEY,{expiresIn:'24h'})
};

exports.registerUser=async(req,res)=>{
    const{username,password}=req.body;
    try{
        const userExists=await User.findOne({username});
        if(userExists){
            return res.status(400).json
            ({
                message:"User already exists"
            });
        }
        const user=await User.create({username,password});
        return res.status(201).json({
            token:generateToken(user._id),
            user:{username:user.username}
        });
    }catch(err){
        res.status(500).json({
            message:"Internal server error"
        });
    }

};
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
};

