
import { searchCocktails, extractIngredients } from '../../../src/services/cocktailApiService.js';
import { mockCocktail } from '../__mocks__/mockData.js';
import { expect } from '@open-wc/testing';
import { stub, match } from 'sinon';

describe('cocktailApiService', () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = window.fetch;
    });

    afterEach(() => {
        window.fetch = originalFetch;
    });

    describe('searchCocktails', () => {
        it('fetches and returns cocktails', async () => {
            window.fetch = stub().callsFake(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ drinks: [mockCocktail] })
                })
            );

            const result = await searchCocktails('margarita');
            expect(result).to.have.length(1);
            expect(result[0]).to.deep.equal(mockCocktail);
            expect(window.fetch).to.have.been.calledWith(
                match('search.php?s=margarita')
            );
        });

        it('handles API errors', async () => {
            window.fetch = stub().callsFake(() =>
                Promise.resolve({ ok: false })
            );

            try {
                await searchCocktails('invalid');
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Network response was not ok');
            }
        });

        it('handles empty results', async () => {
            window.fetch = stub().callsFake(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ drinks: null })
                })
            );

            const result = await searchCocktails('nonexistent');
            expect(result).to.deep.equal([]);
        });
    });

    describe('extractIngredients', () => {
        it('extracts ingredients with measures', () => {
            const ingredients = extractIngredients(mockCocktail);
            expect(ingredients).to.deep.equal([
                { name: 'Tequila', measure: '2 oz' },
                { name: 'Lime Juice', measure: '1 oz' },
                { name: 'Triple Sec', measure: '1 oz' }
            ]);
        });

        it('handles missing measures', () => {
            const cocktail = {
                strIngredient1: 'Salt',
                strMeasure1: null
            };
            const ingredients = extractIngredients(cocktail);
            expect(ingredients).to.deep.equal([
                { name: 'Salt', measure: null }
            ]);
        });

        it('handles empty ingredients', () => {
            const ingredients = extractIngredients({});
            expect(ingredients).to.deep.equal([]);
        });
    });
});