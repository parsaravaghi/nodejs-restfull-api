function checkUndefined(arr)
{
    let res = true
    //checking elements are undefined or ""
    arr.forEach((e)=>{
        if(!e)
        {
            res = false
        }
    })
    return res
}

async function checkFrequent(db ,key , value)
{
    // checking for frequently value
    const check = await db.findOne({[key] : value})
    return !check
}

function UserAuth(req)
{
    let user = req.session.user
    if(user)
    {
        return user
    }
    else
    {
        return null
    }
}

export{checkUndefined , checkFrequent , UserAuth}