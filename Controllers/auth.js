import xss from "xss";
import { user } from "../Models/setting.js";
import { checkFrequent, checkUndefined } from "./features.js";
import bcrypt from "bcrypt"

async function Register(req , res)
{
    // getting headers
    const {username , password , email} = req.body

    // checking headers and frequent value
    if(checkUndefined([username , password , email]) )
    {
        if(await checkFrequent(user , "username" , username))
        {
            // hashing password
            const passwordHash = bcrypt.hashSync(password , 10)
            await user.insertOne({username : xss(username) , passwordHash : passwordHash , email : xss(email)})
            
            // setting created response
            res.status(201).json({message : "created"}).end()
        }
        else
        {
            res.status(409).json({message : "this username is used before"}).end()
        }
    }
    else
    {
        // setting error
        res.status(406).json({message : "please fill all fields"}).end()
    }
    
}
async function Login(req , res)
{
    if(!req.session.user)
    {
        const {username , password } = req.body

        // finding user with username case
        const finedUser = await user.findOne({username : username})

        // checking does username exist or not
        if(finedUser)
        {
            // checking password
            if(bcrypt.compareSync(password , finedUser.passwordHash))
            {
                // setting session
                req.session.user = {username : finedUser.username , email : finedUser.email}

                // send success message
                res.status(202).json({message : "you logged in successfully"}).end()
            }
            else
            {
                // sending error
                res.status(406).json({message : "your password is wrong"}).end()
            }
        }
        else
        {
            // setting error message
            req.status(409).json({message : "this username doesnt exist"}).end()
        }
    }
    else
    {
        // sending authentication error 
        res.status(403).json({message : "you logged in before"}).end()
    }
}

export{Register , Login}