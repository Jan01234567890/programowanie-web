import { wczytaj, zapisz } from "./magazyn.js";

const [, , komenda, argument] = process.argv;

const pokazListe = async () => {
    const zadania = await wczytaj();
    
    if(zadania.length === 0){
        console.log("Brak zadań");
        return;
    }

    zadania.map(({nazwa, czyZrobione}, i) => console.log(`${i + 1}. [${czyZrobione ? "x" : ""}] ${nazwa}`));
}

const dodajZadanie = async (zadanie) => {
    if(!zadanie){
        console.error("Błąd: nie podano nazwy zadania");
        return;
    }

    const zadania = await wczytaj();
    const noweZadania = [...zadania, {nazwa: zadanie.trim(), czyZrobione: false}];

    zapisz(noweZadania);
    console.log(`Dodano zadanie nr ${noweZadania.length}: ${zadanie}`);
}

const ustawNaZrobione = async (nr) => {
    const zadania = await wczytaj();

    if(!Number.isInteger(nr) || nr <= 0 || nr >= zadania.length + 1){
        console.error("Błąd: nie podano poprawnego numeru zadania");
        return;
    }

    const noweZadania = zadania.map((zadanie, i) => i === nr - 1 ? {...zadanie, czyZrobione: true} : zadanie );
    await zapisz(noweZadania);
    console.log(`Zrobiono zadanie nr ${nr}`);
}

switch(komenda){
    case "lista":
        await pokazListe();
        break;
    case "dodaj":
        await dodajZadanie(argument);
        break;
    case "zrobione":
        await ustawNaZrobione(argument);
        break;
}