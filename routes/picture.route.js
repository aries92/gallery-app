const express = require('express');
const pictureController = require('../controllers/picture.controller');
const router = express.Router();
const middleware = require('../middleware');


router.route('/pictures')
    .get(pictureController.getPictures)
    .post(
        middleware.postGCS,
        pictureController.addPicture
    )


router.route('/pictures/:name')
    .delete(
        middleware.deleteGCS,
        pictureController.deletePicture
    )
    .put(pictureController.updatePictureTitle);


module.exports = router;