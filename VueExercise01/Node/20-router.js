const express = require('express');

const router = express.Router();

router.get('/user/list',(req,res)=>{
    res.send('Get User list');
});

router.post('/user/add',(res,req)=>{

})

module.exports = router;