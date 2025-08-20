
/**
 * @fileoverview Utility functions for printing shopping lists in a formatted layout
 */

/**
 * @typedef {Object} ShoppingItem
 * @property {string} name - Name of the ingredient
 * @property {string|null} measure - Amount of the ingredient (optional)
 */

/**
 * Prints a formatted shopping list in a new window
 *
 * @param {ShoppingItem[]} items - Array of shopping list items to print
 * @throws {Error} When browser blocks popup window or printing fails
 * @example
 * printShoppingList([
 *   { name: "Tequila", measure: "1 1/2 oz" },
 *   { name: "Lime Juice", measure: "1 oz" }
 * ]);
 */
export const printShoppingList = (items) => {
    try {
        // Open a new window for printing
        const printWindow = window.open('', '', 'width=600,height=800');

        if (!printWindow) {
            throw new Error('Unable to open print window. Please allow popups for this site.');
        }

        // Generate HTML content with print-friendly styles
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Shopping List</title>
                <style>
                    /* Print-friendly styles */
                    @media print {
                        @page {
                            margin: 1cm;
                        }
                    }
                    
                    /* Document styles */
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                        line-height: 1.5;
                    }

                    /* Header styling */
                    h1 {
                        color: #333;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }

                    /* List styling */
                    ul {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }

                    li {
                        padding: 5px 0;
                        border-bottom: 1px solid #eee;
                        break-inside: avoid;
                    }
                </style>
            </head>
            <body>
                <h1>Shopping List</h1>
                <ul>
                    ${items.map(item =>
            `<li>${item.measure ? `${item.measure} of ` : ''}${item.name}</li>`
        ).join('')}
                </ul>
            </body>
            </html>
        `;

        // Write content to the print window
        printWindow.document.write(html);
        printWindow.document.close();

        // Prepare and execute printing
        printWindow.focus();

        // Wait for resources to load before printing
        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    } catch (error) {
        console.error('Error printing shopping list:', error);
        throw new Error('Failed to print shopping list. Please try again.');
    }
};