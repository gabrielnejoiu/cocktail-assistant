import { fixture, html, expect } from '@open-wc/testing';
import '../../components/Toaster/Toaster.js';

describe('Toaster', () => {
    const mockMessages = [
        { id: 1, text: 'Info message', type: 'info' },
        { id: 2, text: 'Success message', type: 'success' },
        { id: 3, text: 'Error message', type: 'error' }
    ];

    it('renders no messages by default', async () => {
        const el = await fixture(html`
            <toast-messages></toast-messages>
        `);

        const toasts = el.shadowRoot.querySelectorAll('.toast');
        expect(toasts.length).to.equal(0);
    });

    it('renders messages with correct types', async () => {
        const el = await fixture(html`
            <toast-messages .messages=${mockMessages}></toast-messages>
        `);

        const toasts = el.shadowRoot.querySelectorAll('.toast');
        expect(toasts.length).to.equal(mockMessages.length);

        toasts.forEach((toast, index) => {
            const message = mockMessages[index];
            expect(toast.classList.contains(message.type)).to.be.true;
            expect(toast.textContent.trim()).to.equal(message.text);
        });
    });

    it('has correct ARIA attributes', async () => {
        const el = await fixture(html`
            <toast-messages .messages=${mockMessages}></toast-messages>
        `);

        const container = el.shadowRoot.querySelector('.toaster');
        expect(container.getAttribute('role')).to.equal('log');
        expect(container.getAttribute('aria-live')).to.equal('polite');
        expect(container.getAttribute('aria-atomic')).to.equal('true');

        const toasts = el.shadowRoot.querySelectorAll('.toast');
        toasts.forEach(toast => {
            expect(toast.getAttribute('role')).to.equal('alert');
            expect(toast.getAttribute('aria-relevant')).to.equal('additions');
        });
    });

    it('applies correct styling for different message types', async () => {
        const el = await fixture(html`
            <toast-messages .messages=${mockMessages}></toast-messages>
        `);

        const styles = window.getComputedStyle(el.shadowRoot.querySelector('.toast.info'));
        expect(styles.backgroundColor).to.not.be.null;
        expect(styles.animation).to.include('slideIn');
    });
});