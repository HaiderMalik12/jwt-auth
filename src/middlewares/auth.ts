import { verify } from "jsonwebtoken";

interface JwtPayload {
    id: number;
}
export const authenticate = (req,res,next) => {
    try {
    // first of all make sure user has provided the authentication token
    const token = req.headers.token;

    // if there is no token send the authentication error
    if(!token){
        return res.status(401).json({msg: 'UnAuthorized: not authenticated!'});
    }
    
    // we need to verify the token
    const results = verify(token, process.env.WEB_TOKEN_SECRET) as JwtPayload
    // you can verify by using jsonwebtoken function 

    // call the verify function

    // you will receive the id from the token

    // if verified then we need to add the user property in the request
    req.user = results.id
    next();
    }
    catch(err){
        return next(new Error('Authentication Error'))
    }
}