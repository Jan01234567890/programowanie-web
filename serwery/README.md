## Uruchomienie

npm install<br>
npm run dev

## Struktura projektu

mb06-katalog-gir-planszowych/<br>
    package.json<br>
    .gitignore<br>
    README.md<br>
    serwer.js - trasy i uruchomienie<br>
    dane.js -  dane katalogu

## Trasy
| Metoda | Adres | Opis | Odpowiedź |
|--------|-------|------|-----------|
| GET | / | strona główna | HTML |
| GET | /gry | pełna lista gier | JSON |
| GET | /gry/:id | gra o danym id; 404 gdy brak | JSON |
| GET | /szukaj?wydawca=&max=&gracze | przefiltrowana lista książek | JSON |
| GET | /statystyki | podsumowanie | JSON |