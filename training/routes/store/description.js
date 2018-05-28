// 가게 정보 불러오기 (GET)
// Header: idx (가게 인덱스)

var express=require('express');
var router=express.Router();
const request=require('async-request');
var pool=require('../../bin/dbPool.js')


router.get('/:idx',async(req,res)=>{
	let getDescriptionQuery='SELECT * FROM description BY idx DESC';
	let getDescription=await pool.queryParam_None(getDescriptionQuery);

	if(!getDescription){
		res.status(500).send({
			message:"Internal Server Error"
		});
	}else{
		res.status(200).send({
			message:"success",
			data:getDescription
		});
	}
});


module.exports=router;
