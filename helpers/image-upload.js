import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    if (req.baseUrl.includes("products")) {
      folder = "products";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error("Formatos permitido png ou jpg."));
    }
    cb(undefined, true);
  },
});

export default imageUpload;
