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

# Przykład
```bash
npm run lista
npm run dodaj -- "Kup mleko"
npm run dodaj -- "Zrób zadanie domowe z matematyki"
npm run zrobione -- 1
npm run lista
```
Pierwsza linijka wypisuje "Brak zadań", ponieważ nie masz jeszcze żadnych zadań zapisanych, druga i trzecia linijka dodają nowe zadania, czwarta linijka ustawia pierwsze zadanie na zrobione, ostatnia linijka wypisuje wszystkie zadania czyli, z których pokazuje zrobione (czyli pierwsze) jako zrobione:
```bash
1. [x] Kup mleko
2. [] Zrób zadanie domowe z matmy
```

# Autor
Jan Huderek 4p1T