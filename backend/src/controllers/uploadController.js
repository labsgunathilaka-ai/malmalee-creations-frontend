const path = require('path');

// POST /api/upload/images  — upload multiple product images
const uploadImages = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }
    const urls = req.files.map(f => `/uploads/images/${f.filename}`);
    res.status(200).json({
      success: true,
      message: `${urls.length} image(s) uploaded successfully`,
      urls,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/upload/video  — upload a single product video
const uploadVideo = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video uploaded' });
    }
    const url = `/uploads/videos/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      url,
      size: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/upload/product-media — upload images + video together for a product
const uploadProductMedia = (req, res) => {
  try {
    const result = { success: true, images: [], video: null };

    if (req.files) {
      if (req.files['images']) {
        result.images = req.files['images'].map(f => `/uploads/images/${f.filename}`);
      }
      if (req.files['video'] && req.files['video'][0]) {
        result.video = `/uploads/videos/${req.files['video'][0].filename}`;
      }
    }

    if (result.images.length === 0 && !result.video) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    res.status(200).json({
      success: true,
      message: 'Media uploaded successfully',
      images: result.images,
      video: result.video,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { uploadImages, uploadVideo, uploadProductMedia };
