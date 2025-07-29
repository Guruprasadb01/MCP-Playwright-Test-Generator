const express = require('express');
const { listTestFiles, getTestFileContent } = require('../services/fileManager');

const router = express.Router();

router.get('/', (req, res) => {
    const files = listTestFiles();
    res.json({ files });
});

router.get('/:fileName', (req, res) => {
    const { fileName } = req.params;
    const content = getTestFileContent(fileName);
    if (!content) {
        return res.status(404).json({ error: 'File not found' });
    }
    res.json({ fileName, content });
});

module.exports = router;