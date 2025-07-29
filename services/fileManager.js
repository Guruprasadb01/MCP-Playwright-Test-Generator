const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '../tests');

function saveTest(fileName, code) {
    const filePath = path.join(testsDir, fileName);
    fs.writeFileSync(filePath, code, 'utf-8');
    return filePath;
}

function listTestFiles() {
    return fs.readdirSync(testsDir).filter(file => file.endsWith('.js'));
}

function getTestFileContent(fileName) {
    const filePath = path.join(testsDir, fileName);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
}

module.exports = { saveTest, listTestFiles, getTestFileContent };