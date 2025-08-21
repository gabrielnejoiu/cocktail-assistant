import { fixture, html, expect } from '@open-wc/testing';
import { mockCocktail, mockShoppingItems } from '../__mocks__/mockData.js';
import '../../components/CocktailList/CocktailCard.js';

describe('CocktailCard', () => {
    it('renders null when no cocktail provided', async () => {
        const el = await fixture(html`
            <cocktail-card></cocktail-card>
        `);
        expect(el.shadowRoot).to.be.null;
    });

    it('renders cocktail details', async () => {
        const el = await fixture(html`
            <cocktail-card .cocktail=${mockCocktail}></cocktail-card>
        `);

        expect(el.shadowRoot.querySelector('.card-title').textContent)
            .to.equal(mockCocktail.strDrink);
        expect(el.shadowRoot.querySelector('.card-instructions').textContent.trim())
            .to.equal(mockCocktail.strInstructions);
    });

    it('disables add button when ingredients in cart', async () => {
        const el = await fixture(html`
            <cocktail-card
                .cocktail=${mockCocktail}
                .shoppingItems=${mockShoppingItems}
            ></cocktail-card>
        `);

        const button = el.shadowRoot.querySelector('.add-button');
        expect(button.disabled).to.be.true;
    });

    it('fires add-ingredients event on button click', async () => {
        const el = await fixture(html`
            <cocktail-card .cocktail=${mockCocktail}></cocktail-card>
        `);

        let eventFired = false;
        el.addEventListener('add-ingredients', (e) => {
            eventFired = true;
            expect(e.detail).to.deep.include({
                name: 'Tequila',
                measure: '2 oz'
            });
        });

        el.shadowRoot.querySelector('.add-button').click();
        expect(eventFired).to.be.true;
    });
});