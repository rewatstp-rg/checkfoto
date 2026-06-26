## NODE.JS
- Node 16.x || 18.x

## USING YARN (Recommend)
- yarn install
- yarn admin 
- npm/yarn install vite

## USING NPM
- npm i OR npm i --legacy-peer-deps
- npm run dev

## HOW TO START
 1. run scirpt in terminal => yarn web
 2. follow to http://localhost:3900/
 3. if you change path API you can change it at .env.admin-dev => VITE_HOST_API

## How to build
 1. change package version in package.json is new version > old version  For example "version": "1.0.3" (Old) change to "version": "1.0.4" (New)
 2. run scirpt in terminal 
    - yarn build:checkrace-sit for DEV web
    - yarn build:checkrace-prod for PROD web

## แก้ไข Url Env sit ( yarn build:admin-sit )
 - เข้าไปที่ไฟล์ .env.admin-sit เปลี่ยน VITE_HOST_API='...'

## eslint
eslint off 
/* eslint import/newline-after-import: "off" */
