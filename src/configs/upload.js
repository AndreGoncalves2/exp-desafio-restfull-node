const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FODER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FODER = path.resolve(__dirname, "uploads");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FODER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        }
    })
};

module.exports = {
    TMP_FODER,
    MULTER,
    UPLOADS_FODER
};