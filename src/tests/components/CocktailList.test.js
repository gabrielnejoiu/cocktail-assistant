import { fixture, html, expect } from '@open-wc/testing';
import { mockCocktail, mockShoppingItems } from '../__mocks__/mockData.js';
import '../../components/CocktailList/CocktailList.js';

describe('CocktailList', () => {
    it('shows loading state', async () => {
        const el = await fixture(html`
            <cocktail-list .loading=${true}></cocktail-list>
        `);

        const loading = el.shadowRoot.querySelector('.loading');
        expect(loading).to.exist;
        expect(loading.textContent).to.include('Searching');
    });

    it('shows empty state when no cocktails', async () => {
        const el = await fixture(html`
            <cocktail-list .cocktails=${[]}></cocktail-list>
        `);

        const empty = el.shadowRoot.querySelector('.no-results');
        expect(empty).to.exist;
        expect(empty.textContent).to.include('No cocktails found');
    });

    it('renders cocktail cards', async () => {
        const el = await fixture(html`
            <cocktail-list 
                .cocktails=${[mockCocktail]}
                .shoppingItems=${mockShoppingItems}
            ></cocktail-list>
        `);

        const cards = el.shadowRoot.querySelectorAll('cocktail-card');
        expect(cards.length).to.equal(1);
    });
});