const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');

// Create a new theme
router.post('/themes', themeController.createTheme);

// Get all themes
router.get('/themes', themeController.getThemes);

// Get a specific theme
router.get('/themes/:themeId', themeController.getTheme);

// Delete a theme
router.delete('/themes/:themeId', themeController.deleteTheme);

// Update a theme
router.put('/themes/:themeId', themeController.updateTheme);

module.exports = router;
