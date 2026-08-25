# Amicare - backend formularzy kontaktowych

Odbiera zgłoszenia z trzech formularzy na stronie i wysyła je mailem pod właściwy adres.

## Routing adresów

| Formularz | Gdzie na stronie | Warunek | Adres |
|---|---|---|---|
| `badanie-kliniczne` | `/badania-kliniczne`, dialog po kliknięciu w badanie | zawsze | `a.gora@amicare.pl` |
| `kontakt` | `/kontakt` | temat `badania-kliniczne` | `a.gora@amicare.pl` |
| `kontakt` | `/kontakt` | temat `wizyta` | `klinika@amicare.pl` |
| `kontakt` | `/kontakt` | pozostałe 4 tematy | `rejestracja@amicare.pl` |
| `wywiad` | popup na każdej podstronie poza główną | badanie `Badania kliniczne` | `a.gora@amicare.pl` |
| `wywiad` | popup | pozostałe | `rejestracja@amicare.pl` |

Adresy siedzą w stałych na górze `server.js`. Frontend przysyła tylko klucz formularza -
nigdy adresu odbiorcy, żeby nikt nie zrobił z serwera relaya do spamu.

## Uruchomienie lokalnie

```bash
cd server
npm install
node server.js
```

Bez `SMTP_HOST` serwer wchodzi w tryb testowy: nic nie wychodzi na zewnątrz,
treść maila ląduje w konsoli. Do sprawdzenia routingu bez prawdziwej skrzynki.

## Wdrożenie na serwer (Ubuntu/Debian, dostęp root)

Front i API stoją na tej samej domenie - nginx serwuje stronę, a `/api` przekazuje
do Node'a na porcie 3000. Dzięki temu formularze działają na ścieżce względnej
i nie potrzebują CORS-a.

### Raz, przy pierwszej instalacji

Na serwerze:

```bash
# 1. Node 20 + nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx rsync

# 2. Katalogi
sudo mkdir -p /var/www/amicare /opt/amicare-api
sudo chown -R $USER:$USER /var/www/amicare /opt/amicare-api
```

Z komputera - wysyłka plików:

```bash
SERWER=root@amicare.pl ./server/deploy/wdroz.sh
```

Skrypt zbuduje front, wgra oba katalogi, zainstaluje zależności i zrestartuje usługę.
Za pierwszym razem usługa jeszcze nie istnieje - zrób punkty 3-6, potem uruchom go ponownie.

Na serwerze:

```bash
# 3. Dane SMTP
sudo cp /opt/amicare-api/.env.example /etc/amicare-api.env
sudo nano /etc/amicare-api.env      # wpisz SMTP_HOST, SMTP_USER, SMTP_PASS
sudo chmod 600 /etc/amicare-api.env

# 4. Usługa
sudo cp /opt/amicare-api/deploy/amicare-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now amicare-api
sudo systemctl status amicare-api

# 5. nginx
sudo cp /opt/amicare-api/deploy/nginx-amicare.conf /etc/nginx/sites-available/amicare
sudo ln -s /etc/nginx/sites-available/amicare /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 6. HTTPS
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d amicare.pl -d www.amicare.pl

# 7. Firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Sprawdzenie: `curl https://amicare.pl/api/health` powinno zwrócić `{"ok":true}`.

### Każde kolejne wdrożenie

```bash
SERWER=root@amicare.pl ./server/deploy/wdroz.sh
```

### Podgląd logów

```bash
sudo journalctl -u amicare-api -f
```

W logu widać typ formularza i adres odbiorcy. Treść zgłoszeń nie jest logowana.

## DNS - żeby maile nie szły do spamu

W panelu domeny, nie na serwerze:

- SPF: `TXT @` -> `v=spf1 include:_spf.DOSTAWCA.pl ~all`
- DKIM: klucz z panelu skrzynki, `TXT` na wskazanym selektorze
- DMARC: `TXT _dmarc` -> `v=DMARC1; p=none; rua=mailto:rejestracja@amicare.pl`

Bez SPF i DKIM Gmail wrzuca wiadomości do spamu i zgłoszenia pacjentów przepadają bez śladu.

## Zabezpieczenia

- Serwer nasłuchuje wyłącznie na `127.0.0.1` - z zewnątrz wchodzi się tylko przez nginx
- Limit 5 zgłoszeń na 10 minut, liczony osobno dla każdego formularza i adresu IP
- Honeypot: ukryte pole `firma`, wypełniane tylko przez boty
- Zgoda RODO sprawdzana po stronie serwera, nie tylko w przeglądarce
- Treść zgłoszeń nie trafia do logów - w logu ląduje tylko typ formularza i adres odbiorcy

## Dodanie kolejnego formularza

Dopisz wpis do `FORMULARZE` w `server.js` i wywołaj z frontendu
`Formularze.wyslij('nazwa-klucza', dane)`. Reszta kodu bez zmian.
