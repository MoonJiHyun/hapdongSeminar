// 메뉴 리스트 불러오기 (GET)

var express=require('express');
var router=express.Router();
const request=require('async-request');


router.get('/',function(req,res){
	console.log('description');

	res.status(200).send({
		message:"menulist"
	})
});



module.exports=router;
