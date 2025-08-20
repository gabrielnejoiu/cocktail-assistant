
/**
 * @fileoverview CocktailList component that displays a grid of cocktail cards
 * and handles loading states and empty results.
 */

import { html } from 'lit-html';
import { component } from '@pionjs/pion';
import './CocktailCard';

/**
 * @typedef {import('./CocktailCard').Cocktail} Cocktail
 * @typedef {import('./CocktailCard').ShoppingItem} ShoppingItem
 */

/**
 * CocktailList web component that renders a responsive grid of cocktail cards
 * with loading and empty states handling.
 *
 * @param {Object} props - Component properties
 * @param {Cocktail[]} [props.cocktails=[]] - Array of cocktails to display
 * @param {boolean} [props.loading=false] - Loading state flag
 * @param {ShoppingItem[]} [props.shoppingItems=[]] - Current shopping list items
 * @returns {HTMLElement} The cocktail list element
 */
function CocktailList({ cocktails = [], loading = false, shoppingItems = [] }) {
    // Show loading state
    if (loading) {
        return html`
            <style>
                /* Loading state styling */
                .loading {
                    text-align: center;
                    padding: 3rem;
                    color: #666;
                    font-size: 1.1rem;
                }
            </style>
            <div class="loading">
                <p>Searching for your perfect cocktail...</p>
            </div>
        `;
    }

    return html`
        <style>
            /* Component container */
            :host {
                display: block;
                width: 100%;
            }

            /* Responsive grid container */
            .list-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
                padding: 1rem;
            }

            /* Ensure consistent card heights */
            .list-container > * {
                height: 100%;
            }

            /* Empty state styling */
            .no-results {
                text-align: center;
                padding: 3rem;
                color: #666;
                font-size: 1.1rem;
            }

            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .list-container {
                    grid-template-columns: 1fr;
                }
            }
        </style>
        ${!cocktails.length ? html`
            <!-- Empty state -->
            <div class="no-results">
                <p>No cocktails found. Try a different search term!</p>
            </div>
        ` : html`
            <!-- Cocktail grid -->
            <div class="list-container">
                ${cocktails.map(cocktail => html`
                    <cocktail-card
                            .cocktail=${cocktail}
                            .shoppingItems=${shoppingItems}
                    ></cocktail-card>
                `)}
            </div>
        `}
    `;
}

// Register the web component
customElements.define('cocktail-list', component(CocktailList));