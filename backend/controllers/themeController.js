const Theme = require('../models/Theme');

// Create a new theme
exports.createTheme = async (req, res) => {
  try {
    // Retrieve the theme details from the request body
    const themeData = req.body;

    // Create a new theme using the Theme model
    const newTheme = await Theme.create(themeData);

    res.status(201).json({ theme: newTheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating theme' });
  }
};

// Get all themes
exports.getThemes = async (req, res) => {
  try {
    // Find all themes
    const themes = await Theme.find();

    res.status(200).json({ themes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving themes' });
  }
};

// Get a specific theme
exports.getTheme = async (req, res) => {
  try {
    // Retrieve the themeId parameter from the request
    const { themeId } = req.params;

    // Find the theme with the specified themeId
    const theme = await Theme.findById(themeId);

    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    res.status(200).json({ theme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving theme' });
  }
};

// Delete a theme
exports.deleteTheme = async (req, res) => {
  try {
    // Retrieve the themeId parameter from the request
    const { themeId } = req.params;

    // Delete the theme with the specified themeId
    await Theme.deleteOne({ _id: themeId });

    res.status(200).json({ message: 'Theme deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting theme' });
  }
};

// Update a theme
exports.updateTheme = async (req, res) => {
  try {
    // Retrieve the themeId parameter from the request
    const { themeId } = req.params;

    // Retrieve the updated theme details from the request body
    const updatedThemeData = req.body;

    // Update the theme with the specified themeId
    const updatedTheme = await Theme.findByIdAndUpdate(themeId, updatedThemeData, {
      new: true,
      runValidators: true
    });

    if (!updatedTheme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    res.status(200).json({ theme: updatedTheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating theme' });
  }
};
