#!/bin/sh
npm install
npm install -g nodemon
npx sequelize db:migrate
npm run dev