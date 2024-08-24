import path from "path";
import fs from "fs";
import multer from "multer";
import logger from "../utils/logger.js";
import { config } from "dotenv";

config();

const uploadsDir = path.join("uploads/");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    logger.debug("Setting destination for uploaded file");
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    logger.debug(`Generated filename: ${filename}`);
    cb(null, filename);
  },
});

// File filter function
function fileFilter(req, file, cb) {
  logger.debug(`Filtering file: ${file.originalname}`);
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    logger.debug("File type is valid");
    cb(null, true);
  } else {
    logger.error("Invalid file type");
    cb(new Error("Images only!"), false);
  }
}

// Single image upload middleware
export const uploadSingleImage = multer({ storage, fileFilter }).single(
  "profilePicture"
);

// Multiple images upload middleware
export const uploadMultipleImages = multer({ storage, fileFilter }).array(
  "policies",
  10
);
