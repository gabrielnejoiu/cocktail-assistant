
import { expect } from '@open-wc/testing';
import { stub, spy, match } from 'sinon';
import { printShoppingList } from '../../../src/utils/printUtils.js';
import { mockShoppingItems } from '../__mocks__/mockData.js';

describe('printUtils', () => {
    let mockWindow;
    let originalOpen;

    beforeEach(() => {
        mockWindow = {
            document: {
                write: spy(),
                close: spy()
            },
            focus: spy(),
            print: spy(),
            close: spy(),
            onload: null
        };
        originalOpen = window.open;
        window.open = stub().returns(mockWindow);
    });

    afterEach(() => {
        window.open = originalOpen;
    });

    it('creates print window with formatted content', () => {
        printShoppingList(mockShoppingItems);

        expect(window.open.called).to.be.true;
        expect(mockWindow.document.write.calledWith(
            match(mockShoppingItems[0].name)
        )).to.be.true;
        expect(mockWindow.document.write.calledWith(
            match(mockShoppingItems[0].measure)
        )).to.be.true;
    });

    it('handles window.open failure', () => {
        window.open.returns(null);

        expect(() => printShoppingList(mockShoppingItems))
            .to.throw('Failed to print shopping list. Please try again.');
    });

    it('sets up print sequence correctly', () => {
        printShoppingList(mockShoppingItems);

        expect(mockWindow.document.close.called).to.be.true;
        expect(mockWindow.focus.called).to.be.true;

        // Simulate onload
        mockWindow.onload();
        expect(mockWindow.print.called).to.be.true;
        expect(mockWindow.close.called).to.be.true;
    });

    it('includes print-specific CSS', () => {
        printShoppingList(mockShoppingItems);

        expect(mockWindow.document.write.calledWith(
            match('@media print')
        )).to.be.true;
    });
});