const express=require('express');
const router=express.Router();

// 로그인
const login=require('./login.js');
router.use('/login',login);


module.exports=router;

