const umiejetnosci = [
  { nazwa: "HTML", poziom: 4, kategoria: "frontend" },
  { nazwa: "CSS", poziom: 4, kategoria: "frontend" },
  { nazwa: "JavaScript", poziom: 5, kategoria: "frontend" },
  { nazwa: "SQL", poziom: 4, kategoria: "backend" },
  { nazwa: "Git", poziom: 1, kategoria: "narzędzia" },
  { nazwa: "Node.js", poziom: 2, kategoria: "backend" },
];

const pokazUmiejetnosci = (lista) => {
  const podsumowanie = document.querySelector("#podsumowanie");
  const kontener = document.querySelector("#lista-umiejetnosci");

  podsumowanie.textContent = `Umiejętności: ${
    lista.length
  }, średni poziom: ${sredniPoziomZaokroglony(lista)}`;
  kontener.innerHTML = lista
    .map(({ nazwa, poziom }) => `<li>${nazwa} - poziom: ${poziom}</li>`)
    .join("");
};

const sredniPoziomZaokroglony = (lista) => {
  return (
    Math.round(
      (lista.reduce((suma, { poziom }) => (suma += poziom), 0) / lista.length) *
        10
    ) / 10
  );
};

const filtruj = (lista, kategoriaDoFiltrowania) => {
  return lista.filter(({ kategoria }) => kategoria == kategoriaDoFiltrowania);
};

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
