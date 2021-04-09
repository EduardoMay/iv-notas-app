import { Note } from "@/interfaces/Note";

/**
 * Get favorites
 *
 * @return  {Note[]}
 */
export const getFavorites = (): Note[] => {
  return localStorage.favoritesNotes
    ? JSON.parse(localStorage.favoritesNotes)
    : [];
};

/**
 * Add favorite
 *
 * @param   {Note}  favorite
 *
 * @return  {void}
 */
export const addFavorite = (favorite: Note): void => {
  const favorites = [...getFavorites(), favorite];

  localStorage.setItem("favoritesNotes", JSON.stringify(favorites));
};

/**
 * Delete favorite
 *
 * @param   {number}  id
 *
 * @return  {void}
 */
export const deleteFavorite = (id: string): void => {
  const favorites = getFavorites().filter((favorite) => favorite.id !== id);

  localStorage.setItem("favoritesNotes", JSON.stringify(favorites));
};
