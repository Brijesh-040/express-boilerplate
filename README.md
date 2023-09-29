# README #

This README would normally document whatever steps are necessary to get your application up and running.

after clone this project to your computer, run following commands to install project.

```bash
$ npm install 
```
Please make sure latest **Node 8+ LTS** and **NPM 5+** are installed.

use `$ sudo npm install` if you're on a mac.

## Run Application in Local Env ( if local DB setup)

```
$ npm run start:local
```

## Run Application in Development Env

```
$ npm run start:dev
```
OR
```
$ node server.js --development
```

## Run Application in Production Env

```
$ npm run start:prod
```
OR
```
$ node server.js --prod

## Run Application in Docker
#   e x p r e s s - b o i l e r p l a t e 
 
 

## Testing On Postman

http://localhost:1600/api/v1/user/signUp  => signUp user
http://localhost:1600/api/v1/user/signIn  => signIn user
http://localhost:1600/api/v1/user/users   => get user List
http://localhost:1600/api/v1/user/users?userId='userObjectId'  => get single user details

http://localhost:1600/api/v1/add            => add product
http://localhost:1600/api/v1/productList    => get products List
http://localhost:1600/api/v1/product/65157ded159be07ba75213fds  => get single prouct details
http://localhost:1600/api/v1/product/65157dc1159be07ba752137f   => update product details

Testing collection on PostMan

https://galactic-flare-597665.postman.co/workspace/3df81d06-9f78-44fc-9744-fb1bcd118b7e/collection/25536329-35cc0749-e0eb-45db-b7bf-3f182e0bdbca