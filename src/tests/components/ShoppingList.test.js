
import { fixture, html, expect } from '@open-wc/testing';
import { mockShoppingItems } from '../__mocks__/mockData.js';
import '../../components/ShoppingList/ShoppingList.js';

describe('ShoppingList', () => {
    it('shows empty state when no items', async () => {
        const el = await fixture(html`
            <shopping-list .items=${[]}></shopping-list>
        `);

        const empty = el.shadowRoot.querySelector('.empty-message');
        expect(empty).to.exist;
        expect(empty.textContent).to.include('Your shopping list is empty');
    });

    it('renders shopping items', async () => {
        const el = await fixture(html`
            <shopping-list .items=${mockShoppingItems}></shopping-list>
        `);

        const items = el.shadowRoot.querySelectorAll('.list-item');
        expect(items.length).to.equal(mockShoppingItems.length);

        const firstItem = items[0];
        expect(firstItem.querySelector('.item-name').textContent)
            .to.equal(mockShoppingItems[0].name);
        expect(firstItem.querySelector('.item-measure').textContent)
            .to.include(mockShoppingItems[0].measure);
    });

    it('fires remove-item event', async () => {
        const el = await fixture(html`
            <shopping-list .items=${mockShoppingItems}></shopping-list>
        `);

        window.confirm = () => true; // Mock confirm dialog

        let eventDetail = null;
        el.addEventListener('remove-item', (e) => {
            eventDetail = e.detail;
        });

        const removeButton = el.shadowRoot.querySelector('.remove-btn');
        removeButton.click();

        expect(eventDetail).to.deep.equal({ index: 0 });
    });

    it('fires print-list event', async () => {
        const el = await fixture(html`
            <shopping-list .items=${mockShoppingItems}></shopping-list>
        `);

        let eventFired = false;
        el.addEventListener('print-list', () => {
            eventFired = true;
        });

        const printButton = el.shadowRoot.querySelector('.print-btn');
        printButton.click();

        expect(eventFired).to.be.true;
    });

    it('does not show print button when empty', async () => {
        const el = await fixture(html`
            <shopping-list .items=${[]}></shopping-list>
        `);

        const printButton = el.shadowRoot.querySelector('.print-btn');
        expect(printButton).to.be.null;
    });
});