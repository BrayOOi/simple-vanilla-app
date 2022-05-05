## Vanilla JavaScript App

This vanilla JS (actually TS) app is built without any major modern Front-End frameworks, and only used a handful of libraries including TS, webpack and immer for better readability and clarity of modular Front End code structure. 

This vanilla JS app attempts to replicate React's style of working with Front-End (eg. Container and Presentational Components, re-rendering, unidirectional data flow and a Redux store), and some ideas such as reducers, hooks, actions, dispatch, store, and store rehydrating.

On top of those, this app also utilized [Custom Events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) for emitting rerender events, and Web's [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) for better UX.

## Features

Below are the basic features for the application:

- The user can see the grouped list of pets
- The user can sort the list of pets in the **first** stack by Adaptability **and / or** Maintenance
- The user can drag their favourite pets from the list to the favourite list
- The user can reorder their preferences in the favourite list
- The user can remove a pet from their preferences in the favourite list
- The user can save or reset their preferences on both lists

## How To Setup

First run

```
$ npm install
```

Then start the server to server the HTML!

```
$ npm run start
```

Server is listening to port `8000`

## Roadmap
- Rewrite the components to utilize Web Components
- Polish the UI

### API

#### GET: List of Pets

```
GET /pets
```
