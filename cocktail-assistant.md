# Cocktail Assistant

Build a tiny app that helps you gather a shopping list for multiple cocktails.

## UI Mockup

```
           ┌───────────────────────────────────────────────────────────────┬──────┐
           │ Margarita                                                     │Search│
           └───────────────────────────────────────────────────────────────┴──────┘

┌─────────────────────────────────────────────────────────────┐ ┌──────────────────────────────┐
│                                                             │ │                              │
│ ┌────────────┐  ────────────────────────────────────        │ │ Shopping List                │
│ │            │                                              │ │ ──────────────────────────── │
│ │            │  ───────────────                             │ │                              │
│ │            │                                              │ │  ─────────────────           │
│ │            │  ───────────────                             │ │                              │
│ │            │                                        ┌───┐ │ │  ─────────────────           │
│ │            │  ───────────────                       │ + │ │ │                              │
│ └────────────┘                                        └───┘ │ │  ─────────────────           │
│                                                             │ │                              │
└─────────────────────────────────────────────────────────────┘ │                              │
                                                                │                              │
                                                                │                              │
┌─────────────────────────────────────────────────────────────┐ │                              │
│                                                             │ │                              │
│ ┌────────────┐  ────────────────────────────────────        │ │                              │
│ │            │                                              │ │                              │
│ │            │  ───────────────                             │ │                              │
│ │            │                                              │ │                              │
│ │            │  ───────────────                             │ │                              │
│ │            │                                        ┌───┐ │ │ ┌─────┐                      │
│ │            │  ───────────────                       │ + │ │ │ │Print│                      │
│ └────────────┘                                        └───┘ │ │ └─────┘                      │
│                                                             │ │                              │
└─────────────────────────────────────────────────────────────┘ └──────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                                                             │
│ ┌────────────┐  ────────────────────────────────────        │
│ │            │                                              │
│ │            │  ───────────────                             │
│ │            │                                              │
│ │            │  ───────────────                             │
│ │            │                                        ┌───┐ │      ┌─────────────────────────┐
│ │            │  ───────────────                       │ + │ │      │        Searching...     │
│ └────────────┘                                        └───┘ │      │                         │
│                                                             │      └─────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

## Features

* *search input* with query submit button
* *query results listing* with thumbnail, name, instructions and "add to shopping list" button for each
* *shopping list* that collects all of the ingredients for the cocktails that the user adds
* *print shopping list* button that opens up a browser dialog to print the ingredients list
* *toaster* that displays various messages: "Searching...", "Here are the results.", "No results found.", "Ingredients added to shopping list.", "Ingredient removed from shopping list."

NOTE: the shopping list deduplicates the items (if two cocktails contain

Tequila, you only need to buy a single bottle of Tequila)

## Requirements

* all code is committed to a public GitHub repository, that you create
* cocktails are fetched using TheCocktailDB\`s open API: <https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita>
* fetch queries are made using the native fetch api: <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>
* you have to use the pionjs hooks library: <https://github.com/pionjs/pion>
* the only UI libraries allowed are [pionjs](https://github.com/pionjs/pion) and lit-html
* the app can be started locally by running these commands: `git clone <repo url>`, `npm install`, `npm start`


## About pionjs

[pionjs](https://github.com/pionjs/pion) is a library inspired by [React hooks](https://reactjs.org/docs/hooks-intro.html). It enables you to create native web components using hooks and lit-html. At Plumelo we use it extensively, so familiarity with it is very important.