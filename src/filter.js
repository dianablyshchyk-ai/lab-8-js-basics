/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 * Специфікація — ТЗ, C2.
 *
 * @param {Show[]} shows
 * @param {FilterOptions} [options]
 * @returns {Show[]}
 */
export function filterShows(shows, options = {}) {
  const { query, genre, minRating } = options || {};

  const cleanQuery = query?.trim().toLowerCase();
  const hasQuery = Boolean(cleanQuery);

  const cleanGenre = genre?.trim();
  const hasGenre = Boolean(cleanGenre);

  const hasMinRating = typeof minRating === 'number' && minRating > 0;

  return shows.filter((show) => {
    if (hasQuery && !show.name.toLowerCase().includes(cleanQuery)) {
      return false;
    }

    if (hasGenre && !show.genres.includes(cleanGenre)) {
      return false;
    }

    if (hasMinRating && (show.rating === null || show.rating < minRating)) {
      return false;
    }

    return true;
  });
}