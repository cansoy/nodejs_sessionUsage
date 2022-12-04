const express=require('express')
const path = require('path')
require('dotenv').config({path:path.join('./.env')})
const server=express()
const session=require('express-session')
const testRouter=require('./routers/testRouter')
// const cookieParser=require('cookie-parser')

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(path.join(__dirname,'./public')))

// console.log(server.get('env'))
//////////////////////////////////////////////////////////////////////////////////////////

// server.use(cookieParser())
server.use(session({
    // genid:function(){
    //     return 'testofmygenid'
    // },
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
    name:'my_test_session',
    // cookie:{secure:function(){
    //     if (server.get('env')==='development') {
    //         console.log(server.get('env'))
    //         return false
    //     }
    // }}
}))
//////////////////////////////////////////////////////////////////////////////////////////
server.set('view engine','ejs')
server.set('views',path.join(__dirname,'./views'))

server.get('/',(req,res)=>{
    if (req.session.session_counter==undefined) {
        req.session.session_counter=1
    }
    else{
        req.session.session_counter++
    }
    req.session.token_session="thatistokensessionuse_ejs_on_p_element_created"
    req.session.another_token_session="req.session.another_token_session_created"
    req.session.unnamed_session="unnmaed"
    console.log(req.session.cookie)
    console.log(req.sessionID)
    res.render('home',{router:req.session.router_session})
})

server.get('/sessions',(req,res)=>{
    const sessions=[]
    const token_session=req.session.token_session
    const another_token_session=req.session.another_token_session
    const session_counter=req.session.session_counter
    sessions.push(token_session)
    sessions.push(another_token_session)
    sessions.push(session_counter)
    console.log(req.session.cookie)
    res.render('sessions',{sessions:sessions})
})
server.get('/destroy',(req,res)=>{
    console.log(req.session)
    // delete req.session.session_counter
    req.session.session_counter=undefined

    // console.log(req.session)
    // console.log(req.session.session_counter)
    // console.log(req.session.id)
    req.session.destroy()
    console.log(req.session.cookie)
    res.render('destroy')
})

server.use('/test',testRouter)

server.listen(process.env.PORT,()=>{
    console.log('//////////////////////////////////////////////////////////////////////////////////////')
})