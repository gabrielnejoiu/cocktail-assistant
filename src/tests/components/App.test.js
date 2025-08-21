
import { fixture, html, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { mockCocktail, mockShoppingItems } from '../__mocks__/mockData.js';
import '../../App.js';

describe('App', () => {
    let el;
    let originalFetch;

    beforeEach(async () => {
        el = await fixture(html`<cocktail-app></cocktail-app>`);
        originalFetch = window.fetch;
    });

    afterEach(() => {
        window.fetch = originalFetch;
    });

    it('initializes with empty state', () => {
        const searchBar = el.shadowRoot.querySelector('search-bar');
        const list = el.shadowRoot.querySelector('cocktail-list');
        const shoppingList = el.shadowRoot.querySelector('shopping-list');

        expect(searchBar).to.exist;
        expect(list).to.exist;
        expect(shoppingList).to.exist;
    });

    // ... other tests ...

    it('shows toast messages', async () => {
        // Add items through event
        const cocktailList = el.shadowRoot.querySelector('cocktail-list');
        cocktailList.dispatchEvent(new CustomEvent('add-ingredients', {
            detail: mockShoppingItems,
            bubbles: true,
            composed: true
        }));

        // Wait for state updates and render
        await el.updateComplete;
        // Additional wait for the async state updates
        await new Promise(resolve => setTimeout(resolve, 0));
        // Wait for another render cycle
        await el.updateComplete;

        const toaster = el.shadowRoot.querySelector('toast-messages');
        const messages = toaster.messages;
        expect(messages).to.have.length(1);
        expect(messages[0].text).to.include('added to shopping list');
    });
});