import { umiejetnosci } from "./dane.js";
import { pokazUmiejetnosci, filtruj } from "./umiejetnosci.js";

pokazUmiejetnosci(umiejetnosci);

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
  x.addEventListener("click", () =>
    pokazUmiejetnosci(
      i ? filtruj(umiejetnosci, x.textContent.toLowerCase()) : umiejetnosci
    )
  )
);
