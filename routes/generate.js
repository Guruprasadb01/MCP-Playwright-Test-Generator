const express = require('express');
const { exec } = require('child_process');
const { generateTestCode } = require('../services/openaiService');
const { saveTest } = require('../services/fileManager');
const { runPlaywrightTest } = require('../services/playwrightRunner');

const router = express.Router();

router.post('/', async (req, res) => {
    const { prompt, fileName = 'generated.spec.js', run = false, framework, openInEditor = false } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    try {
        let fullPrompt = prompt;
        if (framework) {
            fullPrompt = `Generate a Playwright test for a ${framework} application. ${prompt}`;
        }

        const code = await generateTestCode(fullPrompt);
        console.log("Generated code:", code);
        // const filePath = saveTest(fileName, code);

        // let runOutput = null;
        // if (run) {
        //     runOutput = await runPlaywrightTest(filePath);
        // }

        // if (openInEditor) {
        //     exec(`code "${filePath}"`);
        // }

        // res.json({ success: true, message: 'Test case generated', filePath, code, runOutput });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;