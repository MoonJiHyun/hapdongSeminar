const express=require('express');
const router=express.Router();

// 가게 메뉴 리스트
const menulist=require('./menulist.js');
router.use('/menulist',menulist);


// 가게 정보 불러오기
const description=require('./description.js');
router.use('/description',description);


// 가게 리뷰 리스트 불러오기
const review=require('./review.js');
router.use('/review',review);


module.exports=router;

