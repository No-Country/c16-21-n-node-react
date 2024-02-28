import multer from 'multer';
import path from 'path';

function checkFileType(file, cb) {
  const allowedExtensions = ['.jpeg', '.jpg', '.png'];

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }
  }
  cb(
    new Error(
      'Error: Invalid file type. Only JPEG, JPG, and PNG images are allowed.'
    )
  );
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

export { upload };
