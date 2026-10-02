export const budujUmiejetnosci = (lista) => {
  return lista
    .map(({ nazwa, poziom }) => `<li>${nazwa} - poziom: ${poziom}</li>`)
    .join("");
};

export const budujPodsumowanie = (lista) => {
  return `Umiejętności: ${
    lista.length
  }, średni poziom: ${sredniPoziomZaokroglony(lista)}`;
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
