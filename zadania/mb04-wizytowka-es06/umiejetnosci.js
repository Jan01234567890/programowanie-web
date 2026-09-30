export const pokazUmiejetnosci = (lista) => {
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

export const filtruj = (lista, kategoriaDoFiltrowania) => {
  return lista.filter(({ kategoria }) => kategoria == kategoriaDoFiltrowania);
};
