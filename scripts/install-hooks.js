const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const HOOKS_SOURCE = path.join(ROOT_DIR, '.githooks');
const GIT_HOOKS_DIR = path.join(ROOT_DIR, '.git', 'hooks');

function installHook(hookName) {
  const sourcePath = path.join(HOOKS_SOURCE, hookName);
  const targetPath = path.join(GIT_HOOKS_DIR, hookName);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Hook no encontrado: ${hookName}`);
    return;
  }

  fs.copyFileSync(sourcePath, targetPath);
  fs.chmodSync(targetPath, 0o755);
  console.log(`Instalado: ${hookName}`);
}

if (!fs.existsSync(GIT_HOOKS_DIR)) {
  console.error('No se encontro .git/hooks. Ejecuta este script dentro de un repositorio git.');
  process.exit(1);
}

installHook('pre-push');
console.log('Git hooks instalados correctamente.');
