
/**
 * @fileoverview Service for interacting with TheCocktailDB API and processing cocktail data
 */

/** Base URL for TheCocktailDB API */
const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

/**
 * @typedef {Object} Cocktail
 * @property {string} strDrink - The name of the cocktail
 * @property {string} strDrinkThumb - URL of the cocktail's image
 * @property {string} strInstructions - Preparation instructions
 * @property {Object.<string, string>} [strIngredient1...strIngredient15] - Ingredient names
 * @property {Object.<string, string>} [strMeasure1...strMeasure15] - Ingredient measurements
 */

/**
 * @typedef {Object} Ingredient
 * @property {string} name - Name of the ingredient
 * @property {string|null} measure - Amount of the ingredient (optional)
 */

/**
 * Searches for cocktails by name using TheCocktailDB API
 *
 * @async
 * @param {string} query - Search term for cocktail name
 * @returns {Promise<Cocktail[]>} Array of cocktail objects matching the search term
 * @throws {Error} When network request fails or response is invalid
 * @example
 * try {
 *   const cocktails = await searchCocktails('margarita');
 *   console.log(cocktails);
 * } catch (error) {
 *   console.error('Search failed:', error);
 * }
 */
export const searchCocktails = async (query) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.drinks || [];
    } catch (error) {
        console.error('Error fetching cocktails:', error);
        throw error;
    }
};

/**
 * Extracts ingredients and their measurements from a cocktail object
 *
 * @param {Cocktail} cocktail - Cocktail object from API response
 * @returns {Ingredient[]} Array of ingredients with their measurements
 * @example
 * const cocktail = await searchCocktails('margarita');
 * const ingredients = extractIngredients(cocktail[0]);
 * // [{ name: "Tequila", measure: "1 1/2 oz" }, ...]
 */
export const extractIngredients = (cocktail) => {
    const ingredients = [];

    // TheCocktailDB API provides up to 15 ingredients
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];

        if (ingredient) {
            ingredients.push({
                name: ingredient.trim(),
                measure: measure ? measure.trim() : null
            });
        }
    }

    return ingredients;
};