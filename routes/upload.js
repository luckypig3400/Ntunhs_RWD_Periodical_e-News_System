const express = require('express');
const router = express.Router();
const path = require('path');
const util = require('util');

router.route('/video').post(async (req, res) => {
    try {
        const file = req.files.video;
        const extension = path.extname(file.name);
        if (file.size > 100000000) throw 'File must be less than 100MB';
        if (file) {
            const fileName = file.md5 + extension;
            const URL = `/videos/${fileName}`;
            await util.promisify(file.mv)('./files' + URL);
            return res.status(200).json({ message: 'Video uploaded successfully', fileName });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});

module.exports = router;
