import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import { Login, Register } from './Controllers/auth.js'
import { Index } from './Controllers/pages.js'

const port = 8080
const app = express()

//using

app.use(bodyParser.json())
app.use(session({secret:"hauhdfui" , 
    unset : "keep" , 
    resave : true , 
    saveUninitialized : true,
    cookie :{
        secure : true , 
    }
}))

app.post('/register' , Register)
app.post('/login' , Login)


app.listen(port , ()=>{
    console.log(`server is listening on port ${port}`)
})