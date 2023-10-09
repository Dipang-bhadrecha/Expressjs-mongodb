// const multer = require("multer");
// const path = require("path");



// // Define the destination folder for uploads
// const uploadFolder = path.join(__dirname, "../../uploads");

// // Check if the upload folder exists, and create it if not
// const fs = require("fs");
// if (!fs.existsSync(uploadFolder)) {
//   fs.mkdirSync(uploadFolder);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadFolder);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

// ----------------------------------------------------------------

const multer = require("multer");
const fs = require("fs");
const moment = require("moment");
const path = require("path");

const uploadFolder = path.join(__dirname, "../../uploads");

// Create the uploads folder if it doesn't exist
fs.promises.mkdir(uploadFolder, { recursive: true })
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const filename = moment().format('YYYY-MM-DD-HH-MM') + '-' + file.originalname;
    cb(null, filename);
  },
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Please upload an image with one of the following extensions: jpg, jpeg, png, svg, gif'), false);
  }
};

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload;



// ----------------------------------------------------------------
// sharp - compress and save image

// ----------------------------------------------------------------
// const service = {}
// Service.multerService = (path, fileType = 'image') => {
//   try {

//       const storage = multer.diskStorage({
//           destination: function (req, file, cb) {
//               const dir = `./uploads/${path}`

//               fs.access(dir, (err) => {
//                   if (err) return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir))
//                   return cb(null, dir)
//               })
//           },


//           filename: function (req, file, cb) {
//               cb(null, moment().format('YYYY-MM-DD-HH-MM') + '-' + Helper.removeSpaces(file.originalname))
//           }
//       })

//       let fileFilter = null

//       if (fileType === 'image') {
//           fileFilter = function (req, file, cb) {
//               //Reject File
//               if (
//                   file.mimetype === 'image/jpeg' ||
//                   file.mimetype === 'image/jpg' ||
//                   file.mimetype === 'image/png' ||
//                   file.mimetype === 'image/svg' ||
//                   file.mimetype === 'image/jpeg'
//               ) {
//                   cb(null, true)
//               } else {
//                   cb(
//                       new Error(
//                           'Please upload profile picture with extension jpg,jpeg,png,svg,gif'
//                       ),
//                       false
//                   )
//               }
//           }
//       }




//       const upload = multer({ storage, fileFilter })

      
      
//       return upload
//   } catch (error) {
//       return error
//   }
// }