const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');
const Theme = require('../models/Theme');

// Create a new theme
router.post('/themes', themeController.createTheme);

// Get all themes
router.get('/themes', themeController.getThemes);

// Get a specific theme
router.get('/themes/:themeId', themeController.getTheme);

// Delete a theme
router.delete('/themes/:themeId', themeController.deleteTheme);

router.post('/themes/save', async(req,res)=>{
    try {
        const {themes} = req.body; // Assuming an array of theme objects is sent in the request body
    
        // Create an array of new themes
        const newThemes = themes.map(themeData => new Theme(themeData));
    
        // Save the themes to the database
        const savedThemes = await Theme.insertMany(newThemes);
    
        res.status(200).json({ message: 'Themes saved successfully', themes: savedThemes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving themes' });
      }
})
// Update a theme
router.put('/themes/:themeId', themeController.updateTheme);

module.exports = router;
