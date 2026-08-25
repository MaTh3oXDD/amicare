/* GitHub Pages nie zna routingu Angulara: wejście prosto na /amicare/cennik
   trafia w serwer, nie w aplikację. Kopia index.html jako 404.html sprawia,
   że Pages oddaje aplikację, a ta sama dobiera widok ze ścieżki. */
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const KATALOG = 'dist/amicare/browser';
const index = join(KATALOG, 'index.html');

if (!existsSync(index)) {
  console.error(`Brak ${index}. Najpierw zbuduj projekt.`);
  process.exit(1);
}

copyFileSync(index, join(KATALOG, '404.html'));
writeFileSync(join(KATALOG, '.nojekyll'), '');
console.log('404.html i .nojekyll gotowe');
