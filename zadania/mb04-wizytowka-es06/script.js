import { umiejetnosci } from "./dane.js";
import {
  budujUmiejetnosci,
  filtruj,
  budujPodsumowanie,
} from "./umiejetnosci.js";
import { adresApi } from "./dane.js";

const podsumowanie = document.querySelector("#podsumowanie");
const listaUmiejetnosci = document.querySelector("#lista-umiejetnosci");

listaUmiejetnosci.innerHTML = budujUmiejetnosci(umiejetnosci);
podsumowanie.textContent = budujPodsumowanie(umiejetnosci);

const formularz = document.querySelector("#formularz-kontaktowy");
const komunikat = document.querySelector("#komunikat");

const pokazKomunikat = (tresc, rodzaj) => {
  komunikat.textContent = tresc;
  komunikat.classList.remove("blad", "sukses");
  komunikat.classList.add(rodzaj);
};

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const imie = document.querySelector("#imie").value.trim();
  const email = document.querySelector("#email").value.trim();
  const temat = document.querySelector("#temat").value;
  const tresc = document.querySelector("#tresc").value.trim();

  if (imie === "") {
    pokazKomunikat("Podaj imię.", "blad");
    return;
  }
  if (email === "") {
    pokazKomunikat("Podaj adres e-mail.", "blad");
    return;
  }
  if (temat === "") {
    pokazKomunikat("Podaj temat.", "blad");
    return;
  }

  pokazKomunikat(
    `Dziękuję, ${imie}. Wiadomość na temat ${temat} została przyjęta`,
    "sukces"
  );

  console.log("Dane z formularza: ", {
    imie: imie,
    email: email,
    temat: temat,
    tresc: tresc,
  });
});

const przelacznikMotywu = document.querySelector("#przelacznik-motywu");

przelacznikMotywu.addEventListener("click", () => {
  const czyJestCiemny = document.body.classList.toggle("ciemny");

  if (czyJestCiemny) {
    przelacznikMotywu.textContent = "Jasny motyw";
  } else {
    przelacznikMotywu.textContent = "Ciemny motyw";
  }
});

const przyciskiFiltrowania = document.querySelectorAll(
  "#przyciski-filtrowania button"
);
[...przyciskiFiltrowania].map((x, i) =>
  x.addEventListener("click", () => {
    listaUmiejetnosci.innerHTML = budujUmiejetnosci(
      i ? filtruj(umiejetnosci, x.textContent.toLowerCase()) : umiejetnosci
    );
    podsumowanie.textContent = budujPodsumowanie(
      i ? filtruj(umiejetnosci, x.textContent.toLowerCase()) : umiejetnosci
    );
  })
);

const inspiracjeHtml = document.querySelector("#inspiracje");

const pobierzUzytkownikow = async (adres) => {
  const odpowiedz = await fetch(adres);

  if (!odpowiedz.ok) {
    throw new Error(`Serwer odpowiedział: ${odpowiedz.status}`);
  }

  return odpowiedz.json();
};

const pokazInspiracje = async () => {
  inspiracjeHtml.innerHTML = `<p class="ladowanie">Ładowanie...</p>`;

  try {
    const uzytkownicy = await pobierzUzytkownikow(adresApi);

    inspiracjeHtml.innerHTML = `<ul class="osoby">
    ${uzytkownicy
      .map(
        ({ name, address }) =>
          `<li><strong>${name}</strong><span>${address.city}</span></li>`
      )
      .join("")}
      </ul>`;
  } catch (blad) {
    console.error("Nie udało się pobrać danych", blad.message);
    inspiracjeHtml.innerHTML = `<p class="blad"> Nie udało się pobrać danych z serwera. Sprawdź połączenie z internetem i ośwież stronę</p>`;
  }
};

pokazInspiracje();
