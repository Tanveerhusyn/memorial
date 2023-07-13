const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: "dnrpvfhgs",
    api_key: "892624489525822",
    api_secret: "3r23GSf0EefP4xC1DYz1tkWSmgE"
  });

  const photoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'PhotoUploads',
      resource_type: 'image',
      eager: [
        { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
        { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none' }
      ]
    }
  });
  const photoUpload = multer({ storage: photoStorage });
  
// Create a new user
router.post('/users', userController.createUser);
router.post('/users/:userId', userController.addMemorial);
router.post('/contactus', userController.sendEmail)

// Get all users
router.get('/users', userController.getUsers);

// Get a specific user
router.get('/users/:userId', userController.getUser);

// Delete a user
router.delete('/users/:userId', userController.deleteUser);

// Update a user
router.put('/users/:userId', photoUpload.single('displayPicture'), userController.updateUser);

module.exports = router;
