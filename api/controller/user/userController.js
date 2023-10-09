const messages = require("../../helper/message");
const statusCode = require("../../helper/statusCode");
const User = require("../../model/user/User");
// const updateUserData = require("../models");
const { ObjectId } = require("mongoose").Types;

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(new ObjectId(userId));

    if (!user) {
      return res.status(statusCode.NotFound).json({ message: messages.USER_NOT_FOUND });
    }

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };

    res.json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(statusCode.InternalServerError).json({ message: messages.USER_PROFILE_SERVER_ERROR });
  }
};

// UPDATE USER
exports.updateUserById = async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;
    const id = req.params;

    // Validate that the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(statusCode.NotFound).json({ message: messages.INVALID_USERID });
    }

    const existingUser = await User.findById(id);
    // console.log(existingUser);

    if (!existingUser) {
      return res.status(statusCode.NotFound).json({ message: messages.USER_NOT_FOUND });
    }

    const updateUserData = {};

    if (firstName) updateUserData.firstName = firstName;
    if (lastName) updateUserData.lastName = lastName;
    if (email) updateUserData.email = email;
    if (phone) updateUserData.phone = phone;

    const result = await User.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateUserData
    );
    return res.status(statusCode.OK).json({ message: messages.USER_UPDATED });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.InternalServerError).json({ messages: messages.SERVER_ERROR_USER_UPDATE});
  }
};


