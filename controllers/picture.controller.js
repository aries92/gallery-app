const mongoose = require('mongoose');
const Picture = require('../models/picture.model.js');

exports.getPictures = (req, res) => {
    Picture.find().exec((err, pictures) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: 'Pictures fetching failed'
            });
        }

        return res.json({
            success: true,
            message: 'Pictures fetched successfully',
            pictures: pictures.reverse()
        });
    });
}

exports.addPicture = (req, res, err) => {
    Picture.count({}, function( err, count){
        if (count < 16) {
            const newPicture = new Picture({
                title: req.body.title,
                name: req.file.cloudStorageObject,
                url: req.file.cloudStoragePublicUrl
            });

            newPicture.save((err, picture) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Saving picture failed'
                    });
                }

                return res.json({
                    success: true,
                    message: 'Picture saved successfully',
                    picture
                });
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Maximum images added. To add new one, remove existing one'
            });
        }
    })
}

exports.updatePictureTitle = (req, res) => {
    Picture.findOneAndUpdate({name: req.params.name},{title: req.body.title}, {new: true}, (err, picture) => {
        if (err) {
            return res.status(400).json({'success': false, 'message': 'Update failed', 'error': err});
        }
        return res.json({'success': true, 'message': 'Updated successfully', picture});
    })
}

exports.deletePicture = (req, res) => {

    Picture.count({}, function( err, count){
        if (count > 4) {
            Picture.remove({name: req.params.name}, (err, picture) => {

                if (err) {
                    return res.json({'success': false, 'message': 'Error: ' + err});
                }

                return res.json({'success': true, 'message': 'Picture deleted successfully'});
            })
        } else {
            return res.status(400).json({'success': false, 'message': 'Should be at least 4 images'});
        }
    })
}






