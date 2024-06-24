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

http://localhost:1600/api/v1/user  => get user details
http://localhost:1600/api/v1/update  => update user details
http://localhost:1600/api/v1/changePassword  => update user password with old password|

http://localhost:1600/api/v1/activate  =>  active user account by userId
http://localhost:1600/api/v1/getAll?isActive=true  =>  get all user list

Testing collection on PostMan

https://documenter.getpostman.com/view/25536329/2sA3XWeKUu