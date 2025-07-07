# JRA Technical Test

Statement: Create a front-end app (from scratch React & Typescript) to manage contacts for a small company.

## Table of Contents

1. [Installation](#installation)
   a. [Dependencies](#dependencies)
   b. [Useful links](#useful-links)
2. [How to run locally](#how-to-run-locally)
   a. [npm start](#npm-start)
   b. [npm test](#npm-test)
   c. [npm run build](#npm-run-build)
   d. [npm run eject](#npm-run-eject)
3. [How it works](#how-it-works)
   a. [API](#api)
   b. [Router](#router)
   c. [Auth Contex](#auth-context)
   d. [Templating](#templating)
   e. [Tests](#tests)
4. [To-do](#to-do)

## Installation

As every required package is mentioned in the [package.json](./package.json) file, a simple install is enough:

```shell
$ cd path-to-project
$ npm install
```

It will install:

- React & React Router
- Typescript
- [Radix UI](#radix-ui)
- SASS
- JEST & testing-library

### Dependencies

#### Radix UI

Radix Themes is a pre-styled component library that is designed to work out of the box with minimal configuration.

Why did I chose it?

> I needed a UI library of components to save time.
> This one looks great and has everything I was looking for in terms of components.
> Plus, I wanted to try somthing new.

Pros:

- Easy to set up
- Good looking without effort
- Almost no need for additional styles
- Accessibility pre-handled

Cons:

- Lack of documentation for props
- Issues with JEST
- Not enough icons

### Useful links

- [API documentation](https://jeanrouyerautomobiles.deno.dev/)
- [Radix UI](https://www.radix-ui.com/):
  - [Documentation](https://www.radix-ui.com/themes/docs/overview/getting-started)
  - [Icons](https://www.radix-ui.com/icons)

## How to run locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## How it works

### Project's Structure

Here is how the project's tree looks like:

.
├── [public](./public)
├── [src](./src)
│ ├── [api](./src/api)
│ │ ├── [methods](./src/api/methods)
│ │ └── ...
│ ├── [components](./src/components)
│ │ ├── [Layout](./src/components/Layout)
│ │ │ ├── [Layout.module.scss](./src/components/Layout/Layout.module.scss)
│ │ │ └── [Layout.tsx](./src/components/Layout/Layout.tsx)
│ │ └── ...
│ ├── [context](./src/context)
│ │ └── [auth.ts](./src/context/auth.ts)
│ ├── [hooks](./src/hooks)
│ ├── [pages](./src/pages)
│ │ ├── [Contacts](./src/pages/Contacts)
│ │ │ ├── [Contacts.tsx](./src/pages/Contacts/Contacts.tsx)
│ │ │ └── [fields.json](./src/pages/Contacts/fields.json)
│ │ ├── [Login](./src/pages/Login)
│ │ │ └── [Login.tsx](./src/pages/Login/Login.tsx)
│ │ └── ...
│ ├── [styles](./src/styles)
│ ├── [types](./src/types)
│ │ ├── [api](./src/types/api)
│ │ └── ...
│ ├── [utils](./src/utils)
│ ├── [App.tsx](./src/App.tsx)
│ └── [index.tsx](./src/index.tsx)
├── [package.json](./package.json)
├── [README.md](./README.md)
└── [tsconfig.json](./tsconfig.json)

### API

Facing CORS-related issues when trying to use API requests, I created:

- JSON files from the data I was able to gather using Postman
- methods to parse/alter the data from those JSON files

Caveats:

- no data consistency after refreshing the page
  > This is not a real API and there is no database: it's just mimicking one for the sake of this project.

API Routes are set up in the [./src/utils/api.ts](./src/utils/api.ts) file.
JSON files are stored at the root of the [./src/api](./src/api) folder.
The logic and methods for each type of items are in the [./src/api/methods](./src/api/methods) folder.

> Note that, at the moment, only users and contacts are ready.

### Router

The Routing system is simply handled using React Router in the [./src/App.tsx](./src/App.tsx) file.

Nothing particular here, except that there are routes that are private (they require to be logged) and others that aren't.

### Auth Context

As it requires an [access to the API](#api), this is a fake version of it with:

- users stored in a JSON file
- methods to compare email/password with what's in this JSON file

Additionally, the usage of React's Context allows to retrieve the user's token/role from wherever in the project.

To avoid being disconnected at every page reload, the token is stored in the `localStorage`.
A `sessionStorage` would probably make more sense here but this is more practical to work with.

### Templating

The actions we need to do for each type of item are basically the same:

- get all of them (with filters)
- get one by ID
- create a new one
- edit one
- delete one

They have different structures but it can be handled the same way:

- display a table with the results (paginated for contacts only)
- filter/sort the results
- display a button that opens a dialog to create a new item
- display a button that opens a menu to access other actions

> It's important to note that some requests aren't accessible for non-admin users. They're labelled "admin only" for them.

So, everything is managed in the [Layout](./src/components/Layout/Layout.tsx) component when passed:

- results
- fields' structure
- actions' methods & dialogs' info

as props, like it's done for the [Contacts](./src/pages/Contacts/Contacts.tsx) page.

There are likely some details to adjust for the next item types that still remain to be implemented but it's meant to be reusable.

### Tests

Unfortunately, I lacked time to probably work on unit tests.
Every component should be covered by tests and this is the highest priority task to do.

However, the storage of token in the `localStorage` has been tested [here](./src/App.test.tsx).

## To-do

- [x] Initiate project
- [x] Add dependencies
- [x] [Router](./src/App.tsx)
- [x] [Authentication system](./src/context/auth.ts)
- [ ] API:
  - [x] [Types](./src/types/api)
  - [ ] Fake Requests:
    - [x] [Logic](./src/api/methods)
    - [x] [Routing system](./src/utils/api.ts)
    - [x] [Users](./src/api/methods/users.ts)
    - [x] [Contacts](./src/api/methods/contacts.ts)
    - [ ] Files
    - [ ] Vehicles
    - [ ] Orders
    - [ ] History
- [ ] Components:
  - [x] [Layout](./src/components/Layout/Layout.tsx)
  - [x] [Nav](./src/components/Nav/Nav.tsx)
  - [x] [Table](./src/components/Table/Table.tsx)
  - [x] [SearchBox](./src/components/SearchBox/SearchBox.tsx)
  - [x] [Pagination](./src/components/Pagination/Pagination.tsx)
  - [x] [Dialog](./src/components/Dialog/Dialog.tsx)
  - [x] [InfoDialog](./src/components/InfoDialog/InfoDialog.tsx)
  - [x] [EditDialog](./src/components/EditDialog/EditDialog.tsx)
  - [x] [DeleteDialog](./src/components/DeleteDialog/DeleteDialog.tsx)
  - [x] [ErrorDialog](./src/components/ErrorDialog/ErrorDialog.tsx)
  - [x] [ActionsMenu](./src/components/ActionsMenu/ActionsMenu.tsx)
- [ ] Pages:
  - [x] [Login](./src/pages/Login/Login.tsx)
  - [x] [Logout](./src/pages/Logout/Logout.tsx)
  - [x] [Home / Contacts](./src/pages/Contacts/Contacts.tsx)
  - [ ] Files
  - [ ] Vehicles
  - [ ] Orders
  - [ ] History
- [x] Features:
  - [x] Show API Response as a list
  - [x] Create new item
  - [x] Update item
  - [x] Delete item
  - [x] Filters system:
    - [x] Pagination
    - [x] Search system
  - [x] Sort system
- [ ] Tests:
  - [x] [App](./src/App.test.tsx)
  - [ ] Components:
    - [ ] Layout
    - [ ] Nav
    - [ ] Table
    - [ ] SearchBox
    - [ ] Pagination
    - [ ] Dialog
    - [ ] InfoDialog
    - [ ] EditDialog
    - [ ] DeleteDialog
    - [ ] ErrorDialog
    - [ ] ActionsMenu
  - [ ] Pages:
    - [ ] Login
    - [ ] Logout
    - [ ] Home / Contacts
    - [ ] Files
    - [ ] Vehicles
    - [ ] Orders
    - [ ] History
