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

switch(komenda){
    case "lista":
        pokazListe();
        break;
}