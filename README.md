## Vanilla JavaScript App

This vanilla JS (actually TS) app is built without any major modern Front-End frameworks, and only used a handful of libraries including TS, webpack and immer for better readability and benefits from modern Front End code structure.

This vanilla JS app attempts to replicate React's style of working with Front-End (eg. Container and Presentational Components, re-rendering, unidirectional data flow and a Redux store), and some ideas such as reducers, hooks, actions, dispatch, store, and store rehydrating.

On top of those, this app also utilized [Custom Events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) for emitting rerender events, and Web's [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) for better UX.

## Features

Below are the basic features for the application:

- They can see the grouped list of pets
- They can sort the list of pets in the **first** stack by Adaptability **and / or** Maintenance
- They can drag their favourite pets from the list to the favourite list
- They can reorder their preferences in the favourite list
- They can remove a pet from their preferences in the favourite list
- They can save or reset their preferences on both lists

## Resources

You're given a simple project with a very simple express server that not only renders the main HTML page, but also returns you the list of pets through `/pets` endpoint!
You're free to change things around however you see fit if you feel it'd be helpful! The HTML structure from Angela will get you started but you can also find a wireframe in `static` folder of how the result should look like!

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

### API

#### GET: List of Pets

```
GET /pets
```
