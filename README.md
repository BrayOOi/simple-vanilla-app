## Instructions

Yoyo, the pet store owner nearby, is a busy person and the only one working there. Because of that, she wants to automate helping customers find the right pet for themselves. She's passed the list of pets they breed to Angela, who's prepared the structure of a Single Page Web app for you. The app allows customers to see a list of pets organised in groups by type and sortable by their Adaptability and/or Maintenance rate. They can drag and drop their favourites to another list, reorder them by most to least favourite choice, and show it to Yoyo. They should be able to reset or save their favourites and filters.
You need to pick up where Angela left off before leaving for the holidays.

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

## Requirements

Here are the expected requirements:

- The App should have the features listed [above](#features)

- It should work on all modern browsers (forget about IE!!!!)

- It should use logic and data flows written in a functional , event-based and reactive programming concept

    Separate the logic between application data state, events and template view / user interactions (unidirectional data flow). 

- Doing things without a library helps us understand you better!

    If you need to use libraries, we recommend Vue, RxJS, Ramda.
    Other than that, feel free to use other libraries that you're confident of.
    (psst. For moving items in the stacks, try your best to do it natively. It'd really help us see what you're capable of! Don't tell anyone I told you that!)

- We love Spaghetti but not in our code!

    Help us understand your flow easier by code comments and clean coding practices.

- We love automated test for the app

- We love our Code statically typed through Typescript!

    But using JS is still allowed in the `tsconfig.json` file.

- Surprise us! Prove yourself and be creative!


## How to Submit

- Exclude `node_modules` folder from the zip

- You can zip the entire project and name it: `<your name>-piktojstest`; Send the file as an attachment replying to the test email

- If you're using Github or an Online Sandbox, you can pass us the link by replying to the test email

- You have **three days** to complete the test. If you are not able to finish, do send us whatever you have done, we will evaluate accordingly. If you need more time to fulfill all the features and requirements, let us know!

Have fun hacking :)

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
