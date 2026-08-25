#!/usr/bin/env bash
# Wdrożenie strony i backendu na własny serwer.
# Uruchamiaj z katalogu głównego repo:  ./server/deploy/wdroz.sh
set -euo pipefail

SERWER="${SERWER:-root@amicare.pl}"     # zmień na swój login@host
KAT_FRONT="/var/www/amicare"
KAT_API="/opt/amicare-api"

echo "==> Buduję front"
npx ng build

echo "==> Wysyłam front na $SERWER:$KAT_FRONT"
rsync -az --delete dist/amicare/browser/ "$SERWER:$KAT_FRONT/"

echo "==> Wysyłam backend na $SERWER:$KAT_API"
rsync -az --delete \
  --exclude node_modules --exclude .env \
  server/ "$SERWER:$KAT_API/"

echo "==> Instaluję zależności i restartuję usługę"
ssh "$SERWER" "cd $KAT_API && npm ci --omit=dev && systemctl restart amicare-api && systemctl --no-pager status amicare-api | head -5"

echo "==> Sprawdzam API"
curl -fsS "https://$(echo "$SERWER" | cut -d@ -f2)/api/health" && echo

echo "==> Gotowe"
