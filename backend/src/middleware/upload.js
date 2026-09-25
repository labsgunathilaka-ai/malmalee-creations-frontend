const multer = require('multer');
const path   = require('path');

// ─── Storage: separate folders for images vs videos ─────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVideo = /mp4|mov|webm|avi/.test(path.extname(file.originalname).toLowerCase());
    cb(null, isVideo ? 'uploads/videos/' : 'uploads/images/');
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

// ─── Accept images OR videos ─────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|webp/;
  const videoTypes = /mp4|mov|webm|avi/;
  const ext = path.extname(file.originalname).toLowerCase();

  const isImage = imageTypes.test(ext) && imageTypes.test(file.mimetype);
  const isVideo = videoTypes.test(ext) &&
    (file.mimetype.startsWith('video/') || file.mimetype === 'application/octet-stream');

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error('Only image (jpeg/jpg/png/webp) or video (mp4/mov/webm/avi) files allowed!'), false);
  }
};

// ─── Size limits: 5MB images, 100MB videos ────────────────────────────────────
const limits = {
  fileSize: 100 * 1024 * 1024,  // 100MB max (covers both images & videos)
};

const upload = multer({ storage, fileFilter, limits });

// ─── Helpers: used in different routes ───────────────────────────────────────
upload.singleImage   = upload.single('image');           // 1 image
upload.multipleMedia = upload.array('media', 10);        // up to 10 images+videos
upload.productMedia  = upload.fields([                   // named fields
  { name: 'images', maxCount: 5 },
  { name: 'video',  maxCount: 1 },
]);

module.exports = upload;
