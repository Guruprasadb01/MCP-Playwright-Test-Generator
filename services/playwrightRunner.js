const { exec } = require('child_process');

function runPlaywrightTest(filePath) {
    return new Promise((resolve, reject) => {
        exec(`npx playwright test "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
}

module.exports = { runPlaywrightTest };