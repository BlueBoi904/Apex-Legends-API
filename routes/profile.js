const express = require('express');

const router = express.Router();

const fetch = require('node-fetch');

router.get('/:platform/:gamertag', async (req, res) => {
  try {
    const headers = {
      'TRN-Api-Key': process.env.TRACKER_API_KEY,
    };
    // Destruct off the req.params obj
    const { platform, gamertag } = req.params;

    const response = await fetch(
      `${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`,
      {
        headers,
      },
    );

    const data = await response.json();

    // Check if player does not exist, send our own custom response
    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message: 'Profile not found',
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = router;
