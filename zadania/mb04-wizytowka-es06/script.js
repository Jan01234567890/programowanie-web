const umiejetnosci = [
  { nazwa: "HTML", poziom: 4, kategoria: "frontend" },
  { nazwa: "CSS", poziom: 4, kategoria: "frontend" },
  { nazwa: "JavaScript", poziom: 5, kategoria: "frontend" },
  { nazwa: "SQL", poziom: 4, kategoria: "backend" },
  { nazwa: "Git", poziom: 1, kategoria: "narzedzia" },
  { nazwa: "Node.js", poziom: 2, kategoria: "backend" },
];

const pokazUmiejetnosci = (lista) => {
  const kontener = document.querySelector("#lista-umiejetnosci");

  for (const nazwa of lista) {
    const element = document.createElement("li");
    element.textContent = nazwa;
    kontener.appendChild(element);
  }
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

const przycisk = document.querySelector("#przelacznik-motywu");

przycisk.addEventListener("click", () => {
  const czyJestCiemny = document.body.classList.toggle("ciemny");

  if (czyJestCiemny) {
    przycisk.textContent = "Jasny motyw";
  } else {
    przycisk.textContent = "Ciemny motyw";
  }
});
