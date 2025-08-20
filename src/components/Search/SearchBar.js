
/**
 * @fileoverview SearchBar component that provides a search interface for cocktails
 * with real-time input handling and form submission.
 */

import { html } from 'lit-html';
import { component, useState } from '@pionjs/pion';

/**
 * SearchBar web component that provides a search input field with submit button.
 * Implements real-time input validation and dispatches search events.
 *
 * @returns {HTMLElement} The search bar element
 * @fires CustomEvent#search - Fired when search is submitted with non-empty value
 */
function SearchBar() {
    /**
     * State for the search input value
     * @type {[string, function]} - Current value and setter function
     */
    const [value, setValue] = useState('');

    /**
     * Handles form submission and dispatches search event
     * @param {Event} e - Submit event object
     * @fires CustomEvent#search
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) return;

        const event = new CustomEvent('search', {
            detail: value.trim(),
            bubbles: true,
            composed: true
        });
        e.target.dispatchEvent(event);
    };

    /**
     * Handles input changes and updates state
     * @param {Event} e - Input event object
     */
    const handleInput = (e) => {
        setValue(e.target.value);
    };

    return html`
        <style>
            /* Search container */
            .search-container {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                max-width: 600px;
                margin: 0 auto;
            }

            /* Search input field */
            input {
                flex: 1;
                padding: 0.75rem;
                font-size: 1rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                transition: border-color 0.2s;
            }

            input:focus {
                outline: none;
                border-color: #007bff;
            }

            /* Search button */
            button {
                padding: 0.75rem 1.5rem;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.2s;
                font-weight: 500;
            }

            /* Button states */
            button:hover:not(:disabled) {
                background-color: #0056b3;
            }

            button:disabled {
                background-color: #cccccc;
                cursor: not-allowed;
            }
        </style>

        <!-- Search form -->
        <form class="search-container" @submit=${handleSubmit}>
            <input
                    type="text"
                    .value=${value}
                    @input=${handleInput}
                    placeholder="Search cocktails..."
                    aria-label="Search cocktails"
            />
            <button
                    type="submit"
                    ?disabled=${!value.trim()}
                    aria-label="Search"
            >
                Search
            </button>
        </form>
    `;
}

// Register the web component
customElements.define('search-bar', component(SearchBar));