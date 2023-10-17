const simpleGit = require('simple-git');
const git = simpleGit();
const path = require('path');
const fs = require('fs-extra');

const rootPath = path.resolve(__dirname, '../');

async function prebuild() {
  try {
    if (fs.existsSync(`${rootPath}/tempRepo`)) fs.removeSync(`${rootPath}/tempRepo`);
    if (fs.existsSync(`${rootPath}/docs`)) fs.removeSync(`${rootPath}/docs`);
    if (fs.existsSync(`${rootPath}/spec`)) fs.removeSync(`${rootPath}/spec`);
    if (fs.existsSync(`${rootPath}/public/img/schemas`)) fs.removeSync(`${rootPath}/public/img/schemas`);
    // Clone le repo GitHub dans un répertoire temporaire
    await git.clone('https://github.com/dunglas/vulcain', 'tempRepo');
    await fs.copySync('tempRepo/docs', `${rootPath}/docs`);
    await fs.copySync('tempRepo/README.md', `${rootPath}/docs/README.md`);
    await fs.copySync('tempRepo/spec', `${rootPath}/spec`);
    await fs.copySync('tempRepo/schemas', `${rootPath}/public/img/schemas`);

    fs.removeSync('tempRepo');

    // update css
    const data = fs.readFileSync(`${rootPath}/styles/fonts.css`, 'utf8');
    const modifiedData = data.replace(new RegExp('/fonts/', 'g'), `${process.env.NEXT_PUBLIC_BASE_URL || ''}/fonts/`);
    fs.writeFileSync(`${rootPath}/styles/fonts.css`, modifiedData, 'utf8');
  } catch (error) {
    console.error(error);
  }
}

prebuild();
