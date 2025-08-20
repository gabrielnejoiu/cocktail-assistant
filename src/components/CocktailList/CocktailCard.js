
/**
 * @fileoverview CocktailCard component that displays a single cocktail with its details
 * and provides functionality to add its ingredients to the shopping list.
 */

import { html } from 'lit-html';
import { component, useEffect } from '@pionjs/pion';
import { extractIngredients } from '../../services/cocktailApiService.js';

/**
 * @typedef {Object} Cocktail
 * @property {string} strDrink - The name of the cocktail
 * @property {string} strDrinkThumb - URL of the cocktail's image
 * @property {string} strInstructions - Preparation instructions
 */

/**
 * @typedef {Object} ShoppingItem
 * @property {string} name - Name of the ingredient
 * @property {string|null} measure - Amount of the ingredient (optional)
 */

/**
 * CocktailCard web component that displays a cocktail recipe card with image,
 * title, instructions, and an add to shopping list button.
 *
 * @param {Object} props - Component properties
 * @param {Cocktail} props.cocktail - Cocktail data to display
 * @param {ShoppingItem[]} [props.shoppingItems=[]] - Current shopping list items
 * @returns {HTMLElement|null} The cocktail card element or null if no cocktail provided
 */
function CocktailCard({ cocktail, shoppingItems = [] }) {
    if (!cocktail) return null;

    /**
     * Handles adding cocktail ingredients to the shopping list
     * @param {Event} e - Click event object
     * @fires CustomEvent#add-ingredients
     */
    const handleAddToList = (e) => {
        const ingredients = extractIngredients(cocktail);
        const event = new CustomEvent('add-ingredients', {
            detail: ingredients,
            bubbles: true,
            composed: true
        });
        e.target.dispatchEvent(event);
    };

    /**
     * Checks if all cocktail ingredients are already in the shopping cart
     * @returns {boolean} True if all ingredients are in cart, false otherwise
     */
    const areIngredientsInCart = () => {
        const ingredients = extractIngredients(cocktail);
        return ingredients.every(ingredient =>
            shoppingItems.some(item =>
                item.name.toLowerCase() === ingredient.name.toLowerCase()
            )
        );
    };

    const isDisabled = areIngredientsInCart();

    return html`
        <style>
            /* Card container */
            :host {
                display: block;
                height: 100%;
            }

            /* Main card styling */
            .card {
                border: 1px solid #dee2e6;
                border-radius: 8px;
                overflow: hidden;
                background: white;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            /* Card image styling */
            .card-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                flex-shrink: 0;
            }

            /* Card content area */
            .card-content {
                padding: 1rem;
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            /* Card title */
            .card-title {
                margin: 0 0 1rem 0;
                font-size: 1.25rem;
            }

            /* Instructions text */
            .card-instructions {
                color: #666;
                margin-bottom: 1rem;
                flex: 1;
            }

            /* Add to cart button */
            .add-button {
                background-color: #28a745;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
                transition: background-color 0.2s;
                margin-top: auto;
            }

            .add-button:hover:not([disabled]) {
                background-color: #218838;
            }

            .add-button[disabled] {
                background-color: #6c757d;
                cursor: not-allowed;
                opacity: 0.65;
            }
        </style>
        <div class="card">
            <img
                class="card-image"
                src="${cocktail.strDrinkThumb}"
                alt="${cocktail.strDrink}"
            />
            <div class="card-content">
                <h3 class="card-title">${cocktail.strDrink}</h3>
                <p class="card-instructions">
                    ${cocktail.strInstructions}
                </p>
                <button
                    class="add-button"
                    @click=${handleAddToList}
                    ?disabled=${isDisabled}
                    title=${isDisabled ? 'All ingredients already in shopping list' : 'Add ingredients to shopping list'}
                >
                    ${isDisabled ? 'Already in Shopping List' : 'Add to Shopping List'}
                </button>
            </div>
        </div>
    `;
}

// Register the web component
customElements.define('cocktail-card', component(CocktailCard));