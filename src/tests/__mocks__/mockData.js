
export const mockCocktail = {
    strDrink: 'Margarita',
    strDrinkThumb: 'https://example.com/margarita.jpg',
    strInstructions: 'Mix ingredients well',
    strIngredient1: 'Tequila',
    strMeasure1: '2 oz',
    strIngredient2: 'Lime Juice',
    strMeasure2: '1 oz',
    strIngredient3: 'Triple Sec',
    strMeasure3: '1 oz'
};

export const mockShoppingItems = [
    { name: 'Tequila', measure: '2 oz' },
    { name: 'Lime Juice', measure: '1 oz' }
];

export const mockToastMessages = [
    { id: 1, text: 'Info message', type: 'info' },
    { id: 2, text: 'Success message', type: 'success' },
    { id: 3, text: 'Error message', type: 'error' }
];

export const mockApiResponse = {
    drinks: [mockCocktail]
};