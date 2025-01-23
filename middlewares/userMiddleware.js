import jwt from 'jsonwebtoken';

import 'dotenv/config';




function authenticateUser(req,res,next){

    const token = req.cookies.token;

    jwt.verify(token,process.env.secretKey,(err,decoded)=>{
        console.log(err);
        if(err) return res.sendStatus(403);
        req.user = decoded ;

        console.log(req.user.role);

        next();
        
    });

};


export default authenticateUser 