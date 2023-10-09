const messages = require("../../helper/message");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpException } = require('express-exception-handler');
const User = require("../../model/user/User");
const statusCode = require("../../helper/statusCode");
const { ObjectId } = require("mongoose").Types;
// const AsymmetricEncrypt = require("../../middleware/encryptionMiddleware");
// const User = require("../../model/user/User");

// REGISTRATION_USER
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, profileImage } =
      req.body;

    // console.log(req.body);

    // Chcek if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(statusCode.BadRequest)
        .json({ message: messages.USER_ALREADY_EXISTS });
    }

    //   if (password) {
    //     const encryptedpass = AsymmetricEncrypt.encrypt(password);
    //     console.log(encryptedpass);
    //     const decryptedPass = AsymmetricEncrypt.decrypt(encryptedpass);
    // }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      profileImage,
      // path: req.file.path
    });

    await newUser.save();

    res
      .status(statusCode.Created)
      .json({ message: messages.USER_REGISTRATION_SUCCESS });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode(500))
      .json({ message: messages.SERVER_ERROR_USER_CREATE });
  }
};

// LOGIN_USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(statusCode.Unauthorized)
        .json({ message: messages.INVALID_CREDENTIAL });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(statusCode.Unauthorized)
        .json({ message: messages.INVALID_PAASWORD_CREDENTIAL });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.InternalServerError)
      .json({ message: messages.LOGIN_ERROR });
  }
};


// FORGOT_PASSWORD
exports.forgotPassword = async (email, req) => {
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(statusCode.BadRequest).json({ message: "User not found" });
    }

    const userEmailid = user.email;

    const token = jwt.sign(
      { user: user.id, email: userEmailid },
      jwtConstants.secret,
      {}
    );

    const expireTime = new Date(Date.now() + 15 * 60 * 1000);

    await User.updateOne(
      { email: userEmailid },
      { resetPasswordToken: token, resetPasswordExpires: expireTime }
    );

    const resetPasswordLink = `${req.protocol}://${req.get(
      'host'
    )}/auth/password-reset/${token}`;

    const res = await EmailService.sendEmail(
      userEmailid,
      'Reset Password link',
      resetPasswordLink
    );

    if (!res.response) {
      throw new NotFoundException(EMAIL_NOT_FOUND);
    }

    return {
      statusCode: 201,
      message: FORGOT_PASSWORD_SENT,
    };
  } catch (error) {
    console.error(error);
    return res.status().json({ messages: messages.SERVER_ERROR_USER_UPDATE});
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(statusCode.BadRequest).json({ message: "User not found" });
    }

    // Check if user.password is a valid hashed password
    if (!user.password.startsWith("$2b$")) {
      return res.status(500).json({ message: "Invalid hashed password format" });
    }

    // Compare the hashed currentPassword with user.password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Update the user's password with the new hashed password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10); // You can adjust the salt rounds
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT



// rolebased login
// userProfile Update
// Social Login
// token refresh
// access control
//account activation/ deactivation


// update user

