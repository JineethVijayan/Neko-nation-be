import jwt from 'jsonwebtoken';
import 'dotenv/config';


function authenticateManager(req,res,next){
    const token = req.cookies.token

jwt.verify(token,process.env.secretKey,(err,decoded)=>{
    console.log(err);

    if(err) return res.send('token not valid or missing').status(403);

    req.user = decoded ;

    console.log(req.user.role);

    if(req.user.role !=='manager' && req.user.role !== 'admin'){
        return res.send('not authenticated');
    }
    
    next();
})

}

export default authenticateManager ;