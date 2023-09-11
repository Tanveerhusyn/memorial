const User = require('../models/User');
const Memorial = require('../models/Memorial')
const nodemailer = require('nodemailer')
const HTML_TEMPLATE = require('./email-template');
require('dotenv').config();
// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Retrieve the user details from the request body
    const userData = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.json({ message: 'Email already exists',user:existingUser });
    }

    // Create a new user using the User model
    const newUser = await User.create(userData);

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    // Retrieve the email details from the request body
    const { to, text ,subject,from} = req.body;
    console.log("INSIDE",from, to)

    // Create a transporter object with your email provider settings
     
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  

    const options = {
      from: `${from} <${from}>`, // sender address
      to: to, // receiver email
      subject: `${subject} <${from}>`, // Subject line
      text: text,
      html: HTML_TEMPLATE(text,from),
  }
    // Send the email
    await transporter.sendMail(options);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
};
// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Get a specific user
exports.getUser = async (req, res) => {
  try {
    // Retrieve the userId parameter from the request
    const { userId } = req.params;

    // Find the user with the specified userId
    const user = await User.findById(userId).populate('memorials');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    // Retrieve the userId parameter from the request
    const { userId } = req.params;

    // Delete the user with the specified userId
    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    // Retrieve the userId parameter from the request
    const { userId } = req.params;

    // Retrieve the updated user details from the request body
    const updatedUserData = req.body;
    let updateData = req.body;

  // Check if displayPicture is being updated
  if (req.file) {
    updateData.displayPicture = req.file.path;
  }
    // Update the user with the specified userId
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

exports.addMemorial = async (req, res) => {
  try {
    // Retrieve the userId parameter from the request
    const { userId } = req.params;

    console.log("User",userId)
    // Retrieve the memorial data from the request body
    const memorialData = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new memorial using the memorial data
    const newMemorial = await Memorial.create(memorialData);

    // Add the new memorial to the user's memorials array
    user.memorials.push(newMemorial);

    // Save the updated user data
    await user.save();

    res.status(200).json({ user:user, memorial:newMemorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};
