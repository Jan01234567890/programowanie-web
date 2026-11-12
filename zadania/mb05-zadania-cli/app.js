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

switch(komenda){
    case "lista":
        pokazListe();
        break;
    case "dodaj":
        dodajZadanie(argument);
        break;
}