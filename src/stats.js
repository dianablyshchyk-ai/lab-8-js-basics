/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  const statsMap = {};

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!statsMap[genre]) {
        statsMap[genre] = { count: 0, ratingSum: 0, ratingCount: 0 };
      }

      statsMap[genre].count += 1;

      if (typeof show.rating === 'number') {
        statsMap[genre].ratingSum += show.rating;
        statsMap[genre].ratingCount += 1;
      }
    }
  }

  const sortedGenres = Object.keys(statsMap).sort((a, b) => a.localeCompare(b));
  const result = {};

  for (const genre of sortedGenres) {
    const { count, ratingSum, ratingCount } = statsMap[genre];
    let averageRating = null;

    if (ratingCount > 0) {
      const rawAvg = ratingSum / ratingCount;
      averageRating = Number(rawAvg.toFixed(1));
    }

    result[genre] = {
      count,
      averageRating,
    };
  }

  return result;
}