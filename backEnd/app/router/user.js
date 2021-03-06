/**
 * handle the api for register and login 
 * verify the jwt
 */
let app = require('express');
let loader = require('../../loader');
let userRouter = app.Router();// return a mini-app 
const passport = require('passport');
userRouter.post('/register', loader.get('user/register'));
userRouter.post('/login', loader.get('user/login'));

//jwt验证并获取 用户信息
userRouter.get('/auth',
    passport.authenticate('jwt', {session: false}),
    loader.get('user/auth'));
module.exports = userRouter;