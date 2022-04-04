const express = require('express');
const router = express.Router();
const path = require('path');
const util = require('util');

router.route('/video').post(async (req, res) => {
    try {
        const file = req.files.video;
        const extension = path.extname(file.name);
        if (file.size > 100000000) return res.status(400).json({ message: 'File must be less than 100MB' });
        if (file) {
            const fileName = file.md5 + extension;
            const URL = `./public/video/${fileName}`;
            await util.promisify(file.mv)(URL);
            return res.status(200).json({ message: 'Video uploaded successfully', fileName });
        } else {
            return res.status(400).json({ message: 'Lost video file' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
});
router.route('/image').post(async (req, res) => {
    try {
        const file = req.files.image;
        const extension = path.extname(file.name);
        if (file.size > 100000000) return res.status(400).json({ message: 'File must be less than 100MB' });
        if (file) {
            const fileName = file.md5 + extension;
            const URL = `./public/image/${fileName}`;
            await util.promisify(file.mv)(URL);
            return res.status(200).json({ message: 'Image uploaded successfully', fileName });
        } else {
            return res.status(400).json({ message: 'Lost image file' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
});

module.exports = router;
