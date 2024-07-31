import { UserAuth } from "./features.js"

async function Index(req , res)
{
    let result = {}
    result.user = req.session.user
    res.json(result)
}

export{Index}