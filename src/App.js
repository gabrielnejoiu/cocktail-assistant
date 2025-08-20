
/**
 * @fileoverview Main application component that orchestrates the cocktail search,
 * shopping list management, and notifications functionality.
 */

import { html } from 'lit-html';
import { component, useState } from '@pionjs/pion';
import { searchCocktails } from './services/cocktailApiService.js';
import { printShoppingList } from './utils/printUtils.js';
import './components/Search/SearchBar.js';
import './components/CocktailList/CocktailList.js';
import './components/ShoppingList/ShoppingList.js';
import './components/Toaster/Toaster.js';

/**
 * @typedef {import('./services/cocktailApiService.js').Cocktail} Cocktail
 * @typedef {import('./services/cocktailApiService.js').ShoppingItem} ShoppingItem
 * @typedef {import('./components/Toaster/Toaster.js').ToastMessage} ToastMessage
 */

/**
 * Main application component that manages the cocktail search and shopping list functionality
 *
 * @returns {HTMLElement} The application's root element
 */
function App() {
    /**
     * Application state management using hooks
     */
    const [cocktails, setCocktails] = useState(/** @type {Cocktail[]} */ ([]));
    const [loading, setLoading] = useState(false);
    const [shoppingItems, setShoppingItems] = useState(/** @type {ShoppingItem[]} */ ([]));
    const [messages, setMessages] = useState(/** @type {ToastMessage[]} */ ([]));

    /**
     * Shows a toast notification message
     *
     * @param {string} text - Message text to display
     * @param {'info'|'success'|'error'} [type='info'] - Type of message
     * @param {number} [duration=3000] - How long to show the message in milliseconds
     */
    const showMessage = (text, type = 'info', duration = 3000) => {
        const id = Date.now();
        const message = { id, text, type };
        setMessages(current => [...current, message]);
        setTimeout(() => {
            setMessages(current => current.filter(msg => msg.id !== id));
        }, duration);
    };

    /**
     * Handles the search event from the SearchBar component
     *
     * @param {CustomEvent} e - Search event with search term in detail
     */
    const handleSearch = async (e) => {
        const searchTerm = e.detail;
        setLoading(true);
        showMessage('Searching...', 'info');

        try {
            const results = await searchCocktails(searchTerm);
            setCocktails(results);
            showMessage(
                results.length ? 'Here are the results.' : 'No results found.',
                results.length ? 'success' : 'info'
            );
        } catch (error) {
            console.error('Search failed:', error);
            showMessage('Search failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles adding ingredients to the shopping list
     *
     * @param {CustomEvent} e - Event containing ingredients to add
     */
    const handleAddIngredients = (e) => {
        const newIngredients = /** @type {ShoppingItem[]} */ (e.detail);
        setShoppingItems(currentItems => {
            const updatedItems = [...currentItems];
            newIngredients.forEach(ingredient => {
                if (!updatedItems.find(item =>
                    item.name.toLowerCase() === ingredient.name.toLowerCase()
                )) {
                    updatedItems.push(ingredient);
                }
            });
            return updatedItems;
        });
        showMessage('Ingredients added to shopping list', 'success');
    };

    /**
     * Handles removing an item from the shopping list
     *
     * @param {CustomEvent} e - Event containing the index of item to remove
     */
    const handleRemoveItem = (e) => {
        const { index } = e.detail;
        setShoppingItems(items => {
            const newItems = [...items];
            newItems.splice(index, 1);
            return newItems;
        });
        showMessage('Ingredient removed from shopping list', 'info');
    };

    /**
     * Handles printing the shopping list
     */
    const handlePrint = () => {
        printShoppingList(shoppingItems);
    };

    return html`
        <style>
            /* Main container */
            .app {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }

            /* Header section */
            .header {
                margin-bottom: 2rem;
            }

            /* Main content layout */
            .main {
                display: grid;
                grid-template-columns: 1fr 300px;
                gap: 2rem;
            }

            /* Responsive layout */
            @media (max-width: 768px) {
                .main {
                    grid-template-columns: 1fr;
                }
            }
        </style>
        <div class="app">
            <header class="header">
                <search-bar @search=${handleSearch}></search-bar>
            </header>
            <main class="main">
                <div class="content">
                    <cocktail-list
                            .cocktails=${cocktails}
                            .loading=${loading}
                            .shoppingItems=${shoppingItems}
                            @add-ingredients=${handleAddIngredients}
                    ></cocktail-list>
                </div>
                <aside class="sidebar">
                    <shopping-list
                            .items=${shoppingItems}
                            @remove-item=${handleRemoveItem}
                            @print-list=${handlePrint}
                    ></shopping-list>
                </aside>
            </main>
            <toast-messages .messages=${messages}></toast-messages>
        </div>
    `;
}

// Register the web component
customElements.define('cocktail-app', component(App));