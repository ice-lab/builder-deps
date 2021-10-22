import * as path from 'path';
import * as fs from 'fs';
import { spawnSync } from 'child_process';

const publishTag = process.env.PUBLISH_TAG || '';

function publish(directory: string): void {
  const npmCommand = ['publish'];
  if (publishTag) {
    npmCommand.push(`--tag=${publishTag}`);
  }
  spawnSync('npm', npmCommand, {
    stdio: 'inherit',
    cwd: directory,
  });
}
const basePath = path.join(process.cwd(), 'packages');
const packages = fs.readdirSync(basePath);

packages.forEach((dir) => {
  if (fs.existsSync(path.join(basePath, dir, 'package.json'))) {
    publish(path.join(basePath, dir));
  }
});