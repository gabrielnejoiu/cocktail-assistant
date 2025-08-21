
import { expect } from '@open-wc/testing';
import { stub } from 'sinon';

window.expect = expect;

// Mock fetch globally
window.fetch = stub();

// Mock window.open for print tests
window.open = stub().returns({
    document: {
        write: stub(),
        close: stub()
    },
    focus: stub(),
    print: stub(),
    close: stub()
});

// Mock confirm
window.confirm = stub().returns(true);