import express from "express";
import { gry } from "./dane.js";
import path from "node:path";

const app = express();

/** 
 * Loguje każde żądanie w terminalu: godzina, metoda i adres.
 * Dodaje do żądania pole "reqczasZadania" (godzina w formacie HH:MM:SS), z którego korzysta trasa /statystyki
 */
const logger = (req, res, next) => {
    req.czasZadania = new Date().toLocaleTimeString("pl-PL");
    console.log(`${req.czasZadania} ${req.method} ${req.url}`)
    next();
}

app.use(logger);

/** Pliki statyczne - strona główna, lista wszystkich potrzebnych linków */
app.use(express.static(path.join(import.meta.dirname, "public")));

/** GET /gry - pełna lista gier */
app.get("/gry", (req, res) => {
    res.json(gry);
});

/** GET /gry:id - jedna gra o danym id; 404 gdy brak gry o takim id */
app.get("/gry/:id", (req, res) => {
    const gra = gry.find(g => g.id === Number(req.params.id));
    if(!gra){
        res.status(404).json({blad: "Nie ma takiej gry"});
        return;
    }
    res.json(gra);
});

/** GET /szukaj?wydawca=&max=gracze - filtrowanie katalogu; brak parametrów = cała lista */
app.get("/szukaj", (req, res) => {
    const {wydawca, max, gracze} = req.query;
    let gryWyszukane = gry;

    if(wydawca){
        gryWyszukane = gryWyszukane.filter(g => g.wydawca.toLowerCase() === wydawca.toLowerCase());
    }
    if(max){
        gryWyszukane = gryWyszukane.filter(g => g.cena <= Number(max));
    }
    if(gracze){
        gryWyszukane = gryWyszukane.filter(g => g.gracze === Number(gracze))
    }

    res.json(gryWyszukane);
})

/**GET /statystyki - podsumowanie katalogu */
app.get("/statystyki", (req, res) => {
    res.json({
        liczbaGier: gry.length,
        sredniaCena: Math.round(gry.reduce((suma, g) => suma += g.cena, 0) / gry.length * 100) / 100,
        najdrozsza: gry.reduce((gMax, g) => g.cena > gMax.cena || !gMax ? gMax = g : gMax = gMax, 0).nazwa
    })
})

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});