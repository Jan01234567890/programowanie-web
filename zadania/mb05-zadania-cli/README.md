# Tytuł i opis
mb05-zadania-cli - Program pozwalający na zarządzanie listą zadań

# Uruchomienie
```bash
npm run [komenda] [argument]
```
W zalęzności od przekazanej komendy i argumentu, takie akcje będą się wywoływać (patrz sekcja Skrypty)

# Struktura projektu
|Plik|Zawartość|
|--|--|
|app.js|obsługa komend z terminala|
|magazyn.js|odczyt i zapis do pliku zadania.json|\

# Skrypty

|Polecenie|Działanie|
|--|--|
|`npm run lista`|wypisuje wszystkie zadania|
|`npm run dodaj -- "tekst"`|dodaje nowe niezrobione zadanie|
|`npm run zrobione -- numer`|ustawia zadanie na zrobione|