const express = require('express');
const router = express.Router();
const memorialController = require('../controllers/memorialController');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configure cloudinary
cloudinary.config({
  cloud_name: "dnrpvfhgs",
  api_key: "892624489525822",
  api_secret: "3r23GSf0EefP4xC1DYz1tkWSmgE"
});

// configure multer storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'VideoUploads',
    resource_type: 'video',
    chunk_size: 6000000,
    eager: [
      { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
      { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none' }
    ]
  }
});
const videoUpload = multer({ storage: videoStorage });

// configure multer storage for photos
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

// configure multer storage for audios
const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AudioUploads',
    resource_type: 'auto',
    eager: [
      { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
      { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none' }
    ]
  }
});
const audioUpload = multer({ storage: audioStorage });

// Create a new memorial
router.post('/memorials', memorialController.createMemorial);
router.post('/memorials/:memorialId/sendEmail',memorialController.sendEmail)
// Get all memorials of a specific user
router.get('/memorials/user/:userId/memorials', memorialController.getMemorialsByUser);
// Get a specific memorial of a specific user
router.get('/users/:userId/memorials/:memorialId', memorialController.getMemorialByUser);

router.get('/memorials/:memorialId', memorialController.getMemorialById);
// Delete a memorial
router.delete('/memorials/:memorialId', memorialController.deleteMemorial);

// Update a memorial
router.put('/memorials/:memorialId',audioUpload.single('backgroundMusic'), memorialController.updateMemorial);
router.put('/memorials/visitors/:memorialId', memorialController.updateVisitors);
router.put('/memorials/notifications/update/:memorialId', memorialController.updateNotification);

router.put('/memorials/:memorialId/stories', photoUpload.single('attachment'), memorialController.addStory);
router.put('/memorials/:memorialId/life', photoUpload.single('attachment'), memorialController.addLife);

// Upload a video for a memorial
router.post('/memorials/:memorialId/videos', videoUpload.single('video'), memorialController.uploadVideo);

// Upload a photo for a memorial
router.post('/memorials/:memorialId/photos', photoUpload.single('photo'), memorialController.uploadPhoto);

// Upload an audio for a memorial
router.post('/memorials/:memorialId/audios', audioUpload.single('audio'), memorialController.uploadAudio);

router.post('/memorials/:memorialId/tributes', memorialController.addTribute);
router.post('/memorials/:memorialId/display-picture', photoUpload.single('displayPicture'), memorialController.updateDisplayPicture);


module.exports = router;
