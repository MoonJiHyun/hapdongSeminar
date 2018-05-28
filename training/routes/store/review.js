// 리뷰 리스트 불러오기 (GET)
// 아이디, 생성시간, 사진, 설명

var express=require('express');
var router=express.Router();
const request=require('async-request');
var pool = require('../../bin/dbPool')


router.get('/:idx', (req, res) => {
  return new Promise((fulfill, reject) => {
    pool.getConnection((err, connection) => {
      if(err) reject(err);
      else fulfill(connection);
    });
  })
  .catch(err => { res.status(500).send({ message: "getConnection error1: "+err });})
  .then((connection) => {
    return new Promise((fulfill, reject) => {
    	 // 특정 가게 가져오기
      var query = 'select * from store where store_idx = ?';
      connection.query(query, req.params.idx, (err, data) => {
        if(err) reject(err);
        else {
          if(data[0]) fulfill(connection);
          else res.status(500).send({message : "no store"});
        }
      });
    });
  })
  .catch(err => { res.status(500).send({ message: "getConnection error2: "+err });})
  .then((connection) => {
    return new Promise((fulfill, reject) => {
    	// primary 키 정렬을 이용하여 특정 가게 테이블 내의 리뷰 가져오기기
      var query = 'select distinct comment_idx from comment where store_idx = ?';
      connection.query(query, req.params.idx, (err, data) => {
        if(err) reject(err);
        else {
          if(data[0]) fulfill([data,connection]);
          else res.status(500).send({message : "no comment"});
        }
      });
    });
  })
  .catch(err => { res.status(500).send({ message: "getConnection error3: "+err });})
  .then(([predata,connection]) => {
    var result = new Array();
    function getdata(i, predata){
      console.log(i);
      return new Promise((fulfill, reject) => {
        var query = 'select * from comment where comment_idx = ?';
        connection.query(query, predata[i].courseid, (err, data) => {
          if(err) res.status(500).send({ message:err});
          else {
            if(data[0]) result[i] = data[0];
            else res.status(200).send({message : "no course"});
            console.log(result);
            if(i === predata.length-1){
              res.status(200).send({result : result});
            }
          }
        });
        if(i === predata.length-1) connection.release();
        else getdata(i+1, predata);
      });
    }
    getdata(0, predata);
  });
});
 


module.exports=router;
