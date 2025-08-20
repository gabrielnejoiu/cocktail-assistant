
/**
 * @fileoverview ShoppingList component that displays and manages a list of cocktail ingredients
 * with functionality to remove items and print the list.
 */

import { html } from 'lit-html';
import { component } from '@pionjs/pion';

/**
 * @typedef {Object} ShoppingItem
 * @property {string} name - Name of the ingredient
 * @property {string|null} measure - Amount of the ingredient (optional)
 */

/**
 * ShoppingList web component that displays a list of ingredients with remove and print functionality.
 *
 * @param {Object} props - Component properties
 * @param {ShoppingItem[]} [props.items=[]] - Array of shopping list items
 * @returns {HTMLElement} The shopping list element
 * @fires CustomEvent#remove-item - Fired when an item is removed from the list
 * @fires CustomEvent#print-list - Fired when the print button is clicked
 */
function ShoppingList({ items = [] }) {
    /**
     * Handles removing an item from the shopping list
     * @param {Event} e - Click event object
     * @param {number} index - Index of the item to remove
     * @fires CustomEvent#remove-item
     */
    const handleRemoveItem = async (e, index) => {
        if (window.confirm('Are you sure you want to remove this item from your shopping list?')) {
            const event = new CustomEvent('remove-item', {
                detail: { index },
                bubbles: true,
                composed: true
            });
            e.target.dispatchEvent(event);
        }
    };

    /**
     * Handles printing the shopping list
     * @param {Event} e - Click event object
     * @fires CustomEvent#print-list
     */
    const handlePrint = (e) => {
        const event = new CustomEvent('print-list', {
            bubbles: true,
            composed: true
        });
        e.target.dispatchEvent(event);
    };

    return html`
        <style>
            /* Component container */
            :host {
                display: block;
            }

            /* Main container */
            .shopping-list {
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 1.5rem;
            }

            /* Title styling */
            .title {
                margin: 0 0 1.5rem 0;
                font-size: 1.25rem;
                color: #333;
                border-bottom: 2px solid #eee;
                padding-bottom: 0.75rem;
            }

            /* List container */
            .list-container {
                margin-bottom: 1rem;
            }

            /* List styling */
            .list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            /* List item styling */
            .list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                border-bottom: 1px solid #eee;
                transition: background-color 0.2s;
            }

            .list-item:hover {
                background-color: #f8f9fa;
            }

            /* Item content layout */
            .item-content {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .item-measure {
                color: #666;
                font-size: 0.9em;
            }

            .item-name {
                color: #333;
            }

            /* Remove button */
            .remove-btn {
                background: none;
                border: none;
                color: #dc3545;
                font-size: 1.25rem;
                cursor: pointer;
                padding: 0.25rem 0.5rem;
                margin-left: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s;
            }

            .remove-btn:hover {
                color: #c82333;
                background-color: rgba(220, 53, 69, 0.1);
            }

            /* Empty state message */
            .empty-message {
                text-align: center;
                color: #666;
                padding: 2rem 1rem;
            }

            .empty-message p {
                margin: 0.5rem 0;
            }

            .empty-message p:first-child {
                font-size: 1.1rem;
                color: #333;
            }

            /* Print button */
            .print-btn {
                width: 100%;
                padding: 0.75rem;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                font-size: 1rem;
                transition: background-color 0.2s;
            }

            .print-btn:hover {
                background-color: #0056b3;
            }

            .print-icon {
                width: 18px;
                height: 18px;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .shopping-list {
                    margin-top: 2rem;
                }
            }
        </style>
        <div class="shopping-list" role="region" aria-label="Shopping List">
            <h3 class="title">Shopping List</h3>
            <div class="list-container">
                ${items.length === 0 ? html`
                    <div class="empty-message" role="status">
                        <p>Your shopping list is empty</p>
                        <p>Search for cocktails and add their ingredients!</p>
                    </div>
                ` : html`
                    <ul class="list" role="list">
                        ${items.map((item, index) => html`
                            <li class="list-item" role="listitem">
                                <div class="item-content">
                                    ${item.measure ? html`
                                        <span class="item-measure">${item.measure} of</span>
                                    ` : ''}
                                    <span class="item-name">${item.name}</span>
                                </div>
                                <button
                                        class="remove-btn"
                                        @click=${(e) => handleRemoveItem(e, index)}
                                        title="Remove ${item.name}"
                                        aria-label="Remove ${item.name}"
                                >×</button>
                            </li>
                        `)}
                    </ul>
                `}
            </div>
            ${items.length > 0 ? html`
                <button
                        class="print-btn"
                        @click=${handlePrint}
                        aria-label="Print Shopping List"
                >
                    <svg class="print-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    Print Shopping List
                </button>
            ` : ''}
        </div>
    `;
}

// Register the web component
customElements.define('shopping-list', component(ShoppingList));