/**
 * Zwraca listę umiejętności zapisanych jako znaczniki <li>
 *
 * @param {Array<object>} lista - tablica umiejętności
 * @returns {string} napis, który zawiera wszystkie elementy listy w znacznikach <li>; pusty, gdy lista jest pusta
 */
export const budujUmiejetnosci = (lista) => {
  return lista
    .map(({ nazwa, poziom }) => `<li>${nazwa} - poziom: ${poziom}</li>`)
    .join("");
};

/**
 * Zwraca podsumowanie na podstawie listy
 *
 * @param {Array<object>} lista - tablica umiejętności
 * @returns {string} napis, który zawiera podsumowanie
 * @throws {Error} gdy tablica jest pusta
 */
export const budujPodsumowanie = (lista) => {
  return `Umiejętności: ${
    lista.length
  }, średni poziom: ${sredniPoziomZaokroglony(lista)}`;
};

/**
 * Zwraca średni poziom umiejętności zaokrągloną do 0.1
 *
 * @param {Array<object>} lista - tablica umiejętności
 * @returns {number} liczba, która jest średnią poziomów zaokrągloną do 0.1 elementów z listy
 * @throws {Error} błąd, gdy lista jest pusta
 */
const sredniPoziomZaokroglony = (lista) => {
  return (
    Math.round(
      (lista.reduce((suma, { poziom }) => (suma += poziom), 0) / lista.length) *
        10
    ) / 10
  );
};

/**
 * Zwraca listę z elementami z daną kategorią
 *
 * @param {Array<object>} lista - tablica obiektów
 * @param {string} kategoriaDoFiltrowania - kategoria po której jest filtrowana lista lub "wszystkie"
 * @returns {Array<object>} nowa lista, która zawiera elementy listy z daną kategorią; pusta, jeśli żadne elementy nie pasują
 */
export const filtruj = (lista, kategoriaDoFiltrowania) => {
  return lista.filter(({ kategoria }) => kategoria == kategoriaDoFiltrowania);
};
