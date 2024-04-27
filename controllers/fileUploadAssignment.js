const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/assignments/'); // Specify the directory where you want to store the files
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    cb(null, new Date().toDateString() + file.originalname);
  }
});

// Init upload
const upload = multer({ storage: storage });

module.exports = upload