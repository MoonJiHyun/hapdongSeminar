const express=require('express');
const router=express.Router();

// 1. 가게 설명 불러오기
const description=require('./description.js');
router.use('/description',description);

// 2. 메뉴 리스트 가져오기
const menulist=require('./menulist.js');
router.use('/menulist',menulist);

// 3. 리뷰 가져오기
const review=require('./review.js');
router.use('/review',review);


module.exports=router;

