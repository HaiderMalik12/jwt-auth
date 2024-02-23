import { validationResult } from "express-validator";
import prisma from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req,res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = await prisma.user.create({
        data:{
            email: req.body.email,
            password: hash
        }
    });
    
    res.status(201).json({msg: 'Signup successful!'})
 }

 export const signin = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // find the user on the based on email
    const user = await prisma.user.findUnique({where:{email: req.body.email}});
    // if there is no user then send the error with 401 status code
     if(!user){
        return res.status(401).json({msg: 'Unauthorized'})
     }

    // if there is a user then compare the user password
    const matched = bcrypt.compareSync(req.body.password, user.password);
    
    // you can use the compare method from bcyrpt

    // if password matched then
    if(matched){
   // send the JSON web token in the response

    // create the JSON Web token 
    const token = jwt.sign({id: user.id}, process.env.WEB_TOKEN_SECRET,{expiresIn: '2d'});
    return res.status(200).json({token});
    }

    return res.status(401).json({msg: 'UnAuthorized: Invalid Email or password'})
   
 }

 /**
  * Only authenticated user can see this route or access this route
  * @param req 
  * @param res 
  */
 export const privateRoute = async(req,res) => {
   
  // privat route implementation
  console.log(req.user);
  return res.json({msg: 'I am in authenticated route'})
 }