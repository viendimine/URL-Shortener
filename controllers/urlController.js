const URL = require("../models/urlModel");
const generateShortCode = require("../utils/generateShortCode");

// POST /shorten - Create a short URL
exports.shortenUrl = async (req, res) => {
  try {
    const { url, alias } = req.body;

    // Check if URL is provided
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Check for alias availability if provided
    if (alias) {
      const aliasExists = await URL.findOne({ shortCode: alias });
      if (aliasExists) {
        return res.status(400).json({ error: "Alias is already taken" });
      }
    }

    // Check if the URL already exists in the database
    const existingUrl = await URL.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
      });
    }

    // Generate a short code (use alias if provided, otherwise generate one)
    const shortCode = alias || generateShortCode();

    // Create and save a new URL record
    const newUrl = new URL({
      originalUrl: url,
      shortCode: shortCode,
      customAlias: alias || "",
      visitCount: 0,
    });
    await newUrl.save();

    // Return the shortened URL
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (error) {
    console.error("Error in shortenUrl:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /:shortCode - Redirect to original URL
exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find the URL by short code
    const url = await URL.findOne({ shortCode });

    // Check if the URL exists and hasn't expired
    if (!url || (url.expiry && url.expiry < Date.now())) {
      return res.status(404).json({ error: "URL not found or expired" });
    }

    // Increment visit count
    url.visitCount += 1;
    await url.save();

    // Redirect to the original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error in redirectUrl:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
