import express from "express";
import { gry } from "./dane.js";

const app = express();

/** GET / - strona główna, lista wszystkich potrzebnych linków */
app.get("/", (req, res) => {
    res.send(`
        <h1>Katalog gier planszowych</h1>
        <ul>
            <li><a href="/gry">/gry</a> - wszystkie gry</li>
            <li><a href="/gry/1">/gry/:id</a> - jedna gra</li>
            <li><a href="/szukaj?max=150">/szukaj</a> - wyszukiwanie</li>
            <li><a href="/statystyki">/statystyki</a> - podsumowanie</li>
        `)
})

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