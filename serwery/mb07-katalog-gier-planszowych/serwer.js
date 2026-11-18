import express from "express";
import { gry } from "./dane.js";
import path from "node:path";
import routerGier from "./trasy/gry.js";

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/** Pliki statyczne - strona główna, lista wszystkich potrzebnych linków */
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/gry", routerGier);

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

/** GET /statystyki - podsumowanie katalogu */
app.get("/statystyki", (req, res) => {
    res.json({
        liczbaGier: gry.length,
        sredniaCena: Math.round(gry.reduce((suma, g) => suma += g.cena, 0) / gry.length * 100) / 100,
        najdrozsza: gry.reduce((gMax, g) => g.cena > gMax.cena || !gMax ? gMax = g : gMax = gMax, 0).nazwa,
        wygenerowano: req.czasZadania
    })
})

/** POST /echo - odsyła treść żądania; służy do sprawdzania, jak serwer czyta dane */
app.post("/echo", (req, res) => {
    console.log(req.body);
    res.json({ odebrano: req.body });
})

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});