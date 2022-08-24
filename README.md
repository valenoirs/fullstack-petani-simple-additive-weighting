# Fullstack Petani Simple Additive Weighting
**Simple Additive Weighting to determine i don't know, farmer? 🍪**

---

## Tech Used
- TypeScript
- Node
- Express
- MongoDB
- express-session
- Cookies
- Simple Additive Weighting
- more...

---

## Instalation

```js
npm i
npm run dev
```

> Rename `local.env` to `.env` and set your dev environment there

##### Default PORT : 5000

---

## NPM Script
- npm start (error : need to copy ./src/views to ./build)

> Will run `npm run build` and then execute the `index.js` file inside `./build` folder with `node build/index` to start the server

- npm run build (error : need to copy ./src/views to ./build)

> Will compile TypeScript from `./src` folder to `./build` folder (This will delete the existing `./build` folder before creating new one)

- npm run serve (error : need to copy ./src/views to ./build)

> Will start the server by executing the `index.js` file inside `./build` folder withtout run `npm run build`

- npm run dev

> Will start the server by executing the `index.ts` file inside `./src` folder using `nodemon`

- npm run lint

> Will run the TypeScript linter

---

##### _valenoirs_