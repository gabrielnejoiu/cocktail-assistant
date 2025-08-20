
/**
 * @fileoverview ToastMessages component that displays notification messages
 * with different types (info, success, error) and animations.
 */

import { html } from 'lit-html';
import { component } from '@pionjs/pion';

/**
 * @typedef {Object} ToastMessage
 * @property {string} text - The message text to display
 * @property {'info'|'success'|'error'} type - The type of message
 * @property {number} id - Unique identifier for the message
 */

/**
 * ToastMessages web component that displays animated notification messages
 * in the bottom-right corner of the screen.
 *
 * @param {Object} props - Component properties
 * @param {ToastMessage[]} [props.messages=[]] - Array of messages to display
 * @returns {HTMLElement} The toast messages container element
 */
function ToastMessages({ messages = [] }) {
    return html`
        <style>
            /* Container positioning */
            .toaster {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none; /* Allow clicking through container */
            }

            /* Individual toast styling */
            .toast {
                padding: 12px 24px;
                border-radius: 4px;
                color: white;
                font-size: 14px;
                min-width: 200px;
                max-width: 400px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease-out forwards;
                pointer-events: auto; /* Enable interactions with toast */
                line-height: 1.4;
            }

            /* Toast type variations */
            .toast.info {
                background-color: #3498db;
            }

            .toast.success {
                background-color: #2ecc71;
            }

            .toast.error {
                background-color: #e74c3c;
            }

            /* Entrance animation */
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            /* Exit animation */
            @keyframes fadeOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .toast.removing {
                animation: fadeOut 0.3s ease-in forwards;
            }
        </style>
        <div 
            class="toaster" 
            role="log" 
            aria-live="polite" 
            aria-atomic="true"
        >
            ${messages.map(message => html`
                <div 
                    class="toast ${message.type}"
                    role="alert"
                    aria-relevant="additions"
                >
                    ${message.text}
                </div>
            `)}
        </div>
    `;
}

// Register the web component
customElements.define('toast-messages', component(ToastMessages));