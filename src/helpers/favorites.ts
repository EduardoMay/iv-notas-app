import { NoteInterface } from "@/interfaces/NoteInterface";

/**
 * Get favorites
 *
 * @return  {NoteInterface[]}
 */
export const getFavorites = (): NoteInterface[] => {
  return localStorage.favoritesNotes
    ? JSON.parse(localStorage.favoritesNotes)
    : [];
};

/**
 * Add favorite
 *
 * @param   {NoteInterface}  favorite
 *
 * @return  {void}
 */
export const addFavorite = (favorite: NoteInterface): void => {
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
export const deleteFavorite = (id: number): void => {
  const favorites = getFavorites().filter((favorite) => favorite.id !== id);

  localStorage.setItem("favoritesNotes", JSON.stringify(favorites));
};
