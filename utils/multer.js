import multer from "multer";

// multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// multer middlewarwe
export const usePhoto = multer({ storage }).single("user-photo");
