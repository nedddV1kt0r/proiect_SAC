const jwt = require('jsonwebtoken');
require('dotenv').config();

var blacklist = [];

function generateToken(payload){

    let unique_jwt_id = Math.floor(Math.random() * 500); // compute a random id for each generated token 
    unique_jwt_id = unique_jwt_id.toString(); // jwtid must be string => we have to convert it to string

    const options = {

        expiresIn: process.env.TOKEN_EXPIRATION,
        issuer: process.env.TOKEN_COMPANY,
        subject: payload.User,
        jwtid: unique_jwt_id
    } 

    const key = process.env.TOKEN_KEY;

    return jwt.sign(payload, key, options); //create the token

}

function checkToken(token, subject, issuer){

    const key = process.env.TOKEN_KEY;

    let message = ''

    const isInBlacklist = blacklist.includes(token);

    if(isInBlacklist)
        message = 'Invalid token!';
    else{

        jwt.verify(token, key, (error, decoded) => {
            
            if (error)
            { 
              message = 'Invalid token!';
            }
            else 
            {
                if((decoded.sub === subject) && (decoded.iss === issuer))
                    message = decoded;
                else
                    message = 'Invalid token!';
            }
            
          });
    }
      
    return message;  
}

function addTokenToBlacklist(token){

    blacklist.push(token);
    
}

function deleteBlacklistedToken()
{
    const key = process.env.TOKEN_KEY;

    for(token in blacklist)
    {
        jwt.verify(blacklist[token], key, (error, decoded) => {
            
            if (error)
            { 
              let index = blacklist.findIndex(item => item === blacklist[token]);
              blacklist.splice(index,1);
            }
                    
          });
    }
}

setInterval(()=>{
    console.log(blacklist);
    deleteBlacklistedToken()
}, 5000);

module.exports =  { generateToken, checkToken, addTokenToBlacklist }