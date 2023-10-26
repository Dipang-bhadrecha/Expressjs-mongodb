const messages = require("../../helper/message");
const bcrypt = require("bcrypt");
const Admin = require('../../model/user/Admin');
const statusCode = require("../../helper/statusCode");


// REGISTER_ADMIN
exports.registerAdmin = async (req, res) => {
  try {
    const { adminName, firstName, lastName, email, password } =
      req.body;

    // Chcek if the email already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res
        .status(statusCode.BadRequest)
        .json({ message: messages.ADIMN_ALREADY_EXISTS });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newAdmin = new Admin({
      adminName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await newAdmin.save();

    res
      .status(statusCode.Created)
      .json({ message: messages.ADMIN_REGISTRATION_SUCCESS });
  } catch (error) {
    res
      .status(statusCode(500))
      .json({ message: messages.SERVER_ERROR_USER_CREATE });
  }
};

// ADMIN_LOGIN
exports.loginAdmin = async (req, res) => {
  try {
    const {email, password} = req.body;

    // find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
      .status(statusCode.Unauthorized)
      .json({message: messages.INVALID_CREDENTIAL});      
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
      .status(statusCode.Unauthorized)
      .json({message: messages.INVALID_CREDENTIAL});
    }
  
    if(admin.role != "admin")
    return res.status(statusCode.Forbidden).json({message: "you are not authorize for this role"});

    // GENERATE A JWT TOKEN
    const token = jwt.sign({ adminId: admin._id}, process.env.JWT_SECRET,{
      expireIn: "1h",
    });
    res.json({ token })

  } catch (error) {
    
  }
}