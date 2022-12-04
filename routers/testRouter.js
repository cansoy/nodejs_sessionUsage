const express=require('express')
const router=express.Router()
let counter=0

router.get('/',(req,res)=>{
    counter+=1
    req.session.router_session=`${counter}_router_session`
    res.render('router',{router_session:req.session.router_session})
})

module.exports=router