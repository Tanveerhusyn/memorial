const Memorial = require('../models/Memorial');
const Tribute = require('../models/Tribute');
const Story = require('../models/Story');
const Life = require('../models/Life');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs')
const nodemailer = require('nodemailer')
const HTML_TEMPLATE = require('./email-template');
require('dotenv').config();
// Create a new memorial
exports.createMemorial = async (req, res) => {
  try {
    // Retrieve the memorial details from the request body
    const memorialData = req.body;

    // Create a new memorial using the Memorial model
    const newMemorial = await Memorial.create(memorialData);

    res.status(201).json({ memorial: newMemorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating memorial' });
  }
};
// Get a specific memorial by ID
exports.getMemorialById = async (req, res) => {
  try {
    // Retrieve the memorialId parameter from the request
    const { memorialId } = req.params;

    // Find the memorial with the specified ID and populate the 'user' field
    const memorial = await Memorial.findById(memorialId)
      .populate('user').populate('theme') .populate({
        path: 'story',
        model: 'Story'
      })
      .populate({
        path: 'life',
        model: 'Life'
      })
      .populate('about.tributes').populate('about.tributes.user');
       // Populate the 'user' field and exclude the 'password' field

    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    res.status(200).json({ memorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving memorial' });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    // Retrieve the email details from the request body
    const { to, text ,subject,from} = req.body;
    console.log("Memorial Email",req.body)

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
      subject: subject, // Subject line
      text: text,
      html: HTML_TEMPLATE(text),
  }
    // Send the email
    await transporter.sendMail(options);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
};
// Get all memorials of a specific user
exports.getMemorialsByUser = async (req, res) => {
  try {
    // Retrieve the userId parameter from the request
    const { userId } = req.params;

    // Find all memorials that belong to the specified user
    const memorials = await Memorial.find({ user: userId });

    res.status(200).json({ memorials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving memorials' });
  }
};

// Get a specific memorial of a specific user
exports.getMemorialByUser = async (req, res) => {
  try {
    // Retrieve the userId and memorialId parameters from the request
    const { userId, memorialId } = req.params;

    // Find the memorial that belongs to the specified user and has the specified memorialId
    const memorial = await Memorial.findOne({ _id: memorialId, user: userId });

    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    res.status(200).json({ memorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving memorial' });
  }
};

// Delete a memorial
exports.deleteMemorial = async (req, res) => {
  try {
    // Retrieve the memorialId parameter from the request
    const { memorialId } = req.params;

    // Delete the memorial with the specified memorialId
    await Memorial.deleteOne({ _id: memorialId });

    res.status(200).json({ message: 'Memorial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting memorial' });
  }
};

 
// Update a memorial
// Update a memorial
exports.updateMemorial = async (req, res) => {
  try {
    // Retrieve the memorialId parameter from the request
    const { memorialId } = req.params;

    // Retrieve the updated memorial details from the request body
    const updatedMemorialData = req.body;

    // Check if a music file is uploaded
    if (req.file) {
      // Upload the music file to Cloudinary or perform any desired processing
      const musicFile = req.file;

      // Retrieve the existing backgroundMusic array from the memorial
      const memorial = await Memorial.findById(memorialId);
      const existingBackgroundMusic = memorial.backgroundMusic || [];

      // Generate a unique public ID for the uploaded audio file
      const publicId = `AudioUploads/${musicFile.originalname}`;
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      });
      // Upload the music file to Cloudinary with the public ID
      const result = await cloudinary.uploader.upload(musicFile.path, {
        resource_type: 'auto',
        folder: 'AudioUploads',
        public_id: publicId,
      });

      // Add the Cloudinary URL of the uploaded audio to the existingBackgroundMusic array
      const updatedBackgroundMusic = [...existingBackgroundMusic, result.secure_url];

      // Update the backgroundMusic field in the updatedMemorialData
      updatedMemorialData.backgroundMusic = updatedBackgroundMusic;

      // Delete the uploaded file from the server if needed

      // Note: Make sure to configure Cloudinary and handle file upload as per your requirements
    }

    // Update the memorial with the specified memorialId
    const updatedMemorial = await Memorial.findByIdAndUpdate(memorialId, updatedMemorialData, {
      new: true,
      runValidators: true
    });

    if (!updatedMemorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    res.status(200).json({ memorial: updatedMemorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating memorial' });
  }
};


exports.updateVisitors = async (req, res) => {
  try {
    // Retrieve the memorialId parameter from the request
    const { memorialId } = req.params;

    // Retrieve the visitorName from the request body
    const { visitorName } = req.body;
    console.log("NAME",visitorName)

    // Update the memorial with the specified memorialId
    const updatedMemorial = await Memorial.findByIdAndUpdate(
      memorialId,
      { $push: { visitors: visitorName } }, // Use $push operator to add the visitorName to the visitors array
      { new: true, runValidators: true }
    );

    if (!updatedMemorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    res.status(200).json({ memorial: updatedMemorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating memorial' });
  }
};


exports.uploadVideo = async (req, res) => {
  try {
    // Get the memorial ID from the request parameters
    const { memorialId } = req.params;

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

  if(req.file){
      // Upload the video to Cloudinary
      const videoPath = req.file.path;

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      });
  
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          videoPath,
          {
            resource_type: 'video',
            folder: 'VideoUploads',
            chunk_size: 6000000,
            eager: [
              { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
              { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none' }
            ]
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
  
     
  
      // Update the memorial with the video URL
      
      memorial.gallery.videos.push(result.secure_url);
      await memorial.save();
  }
  else{
      
    memorial.gallery.videos.push(req.body.video);
    await memorial.save();
  }

    // Return the updated memorial
    res.status(200).json({ videos:memorial.gallery.videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video' });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    // Get the memorial ID from the request parameters
    const { memorialId } = req.params;

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

  if(req.file){
      // Upload the photo to Cloudinary
      const photoPath = req.file.path;

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_SECRET
      });
  
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          photoPath,
          {
            resource_type: 'image',
            folder: 'PhotoUploads',
            eager: [
              { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
              { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none' }
            ]
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
  
      // Update the memorial with the photo URL
      memorial.gallery.photos.push(result.secure_url);
      await memorial.save();
  }
  else {
    memorial.gallery.photos.push(req.body.photo);
    await memorial.save();
  }

    // Return the updated memorial
    res.status(200).json({ photos: memorial.gallery.photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading photo' });
  }
};

exports.uploadAudio = async (req, res) => {
  try {
    // Get the memorial ID from the request parameters
    const { memorialId } = req.params;

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    // Upload the audio to Cloudinary
   if(req.file){
    const audioPath = req.file.path;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        audioPath,
        {
          resource_type: 'auto',
          folder: 'AudioUploads',
          eager: [
            { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
            { width: 160, height: 100, crop: 'crop', gravity: 'south', audio_codec: 'none' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    // Update the memorial with the audio URL
    memorial.gallery.audios.push(result.secure_url);
    await memorial.save();
   }
   else {
    memorial.gallery.audios.push(req.body.audio);
    await memorial.save();
   }

    // Return the updated memorial
    res.status(200).json({ audios: memorial.gallery.audios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading audio' });
  }
};



exports.addTribute = async (req, res) => {
  try {
    const { memorialId } = req.params;

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    const { user, date, description } = req.body;

    // Create a new tribute
    const tribute = new Tribute({ user, date, description });

    // Save the tribute to the memorial
    memorial.about.tributes.push(tribute);
    await memorial.save();

    // Return the updated array of tribute objects
    const updatedTributes = await Memorial.findById(memorialId).populate('about.tributes').populate('about.tributes.user');
    res.status(200).json({ tributes: updatedTributes.about.tributes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding tribute' });
  }
};



exports.updateDisplayPicture = async (req, res) => {
  try {
    const { memorialId } = req.params;

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    // Upload the display picture to Cloudinary
    const displayPicturePath = req.file.path;

    // Upload the display picture to Cloudinary using the same storage configuration

    // Update the memorial with the display picture URL
    memorial.displayPicture = req.file.path;
    await memorial.save();

    // Return the updated memorial
    res.status(200).json({ picture:memorial.displayP});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating display picture' });
  }
};


// Add a story to a memorial
exports.addStory = async (req, res) => {
  try {
    const { memorialId } = req.params;
    const { title, date, description, author } = req.body;
  

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    const attachmentUrl = req.file.path;
    const story = await Story.create({ title, date, description, author, attachments: [attachmentUrl] });
     
  

    // Add the new story to the memorial's story array
    memorial.story.push(story);
 
    await memorial.save();

    res.status(200).json({ story: memorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding story' });
  }
};
exports.addLife = async (req, res) => {
  try {
    const { memorialId } = req.params;
    const { title, date, description, author } = req.body;
  

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorialId);
    if (!memorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    const attachmentUrl = req.file.path;
    const life = await Life.create({ title, date, description, author, attachments: [attachmentUrl] });
     
  

    // Add the new story to the memorial's story array
    memorial.life.push(life);
 
    await memorial.save();

    res.status(200).json({ story: memorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding story' });
  }
};

// Update the memorial's notification
exports.updateNotification = async (req, res) => {
  try {
    // Retrieve the memorialId parameter from the request
    const { memorialId } = req.params;

    // Retrieve the selected notification options from the request body
    const { birthday, passed, post, emailSent } = req.body;

    // Find the existing memorial
    const existingMemorial = await Memorial.findById(memorialId);

    if (!existingMemorial) {
      return res.status(404).json({ message: 'Memorial not found' });
    }

    // Update the notification object based on the selected options
    const updatedNotification = {
      birthday: birthday !== undefined ? JSON.parse(birthday) : existingMemorial.notification.birthday,
      passed: passed !== undefined ? JSON.parse(passed) : existingMemorial.notification.passed,
      post: post !== undefined ? JSON.parse(post) : existingMemorial.notification.post,
      emailSent:false
    };

    // Update the memorial with the specified memorialId
    const updatedMemorial = await Memorial.findByIdAndUpdate(
      memorialId,
      { notification: updatedNotification },
      { new: true, runValidators: true }
    );

    res.status(200).json({ memorial: updatedMemorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating memorial notification' });
  }
};
