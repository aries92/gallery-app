const format = require('util').format;
const multer = require('multer');
const admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: 'https://gallery-app-1b5b8.firebaseio.com'
});

const bucket = admin.storage().bucket(process.env.FIREBASE_BUCKET_URL);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    },
}).single('gallery_image');

const postGCS = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error '+err.code
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Error: during upload'
            });
        }

        const gcsname = Date.now() + req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            file.makePublic().then(() => {
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
                next();
            });
        });

        stream.end(req.file.buffer);


    })
}

const deleteGCS = (req, res, next) => {
    const file = bucket.file(req.params.name);
    file.delete((err, apiResponse) => {
        // if (!err) next()
        next()
    });
}

const getPublicUrl = (name) => {
    return format(`https://storage.googleapis.com/${bucket.name}/${name}`)
}

module.exports = {
    postGCS,
    getPublicUrl,
    deleteGCS
}