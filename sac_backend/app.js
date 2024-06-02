const express = require('express');
const db_conn = require('./dbconnection');
const { generateToken, checkToken, addTokenToBlacklist } = require('./tokenhandler');
const {getCustomersName, getCustomersData} = require('./customershandler.js');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*"
}));


app.get('/checkUserRole', (request, response) => {

const query = "SELECT COUNT(*) as isInList FROM iamlist WHERE username = ?";

db_conn.query(query, [request.query.username], (error, result)=>{

    if(error)
        return response.json(error);

    const is_user_in_list = result[0].isInList;

    if(is_user_in_list)
    {
        const payload = {
            User: request.query.username,
            iat: Math.floor(Date.now() / 1000)
        }

        return response.json(generateToken(payload));
    }
    else
        return response.json("00000000")

    

});

});

app.get('/protectedResource', (request, response) => {

    let bearer_token = request.headers.authorization;
    bearer_token = bearer_token.split(' ');

    const isBearer = bearer_token[0];
    const token = bearer_token[1];
    const subject = bearer_token[2];
    const issuer = bearer_token[3];

    if(isBearer !== "Bearer")
        return response.sendStatus(403);

    const message = checkToken(token, subject, issuer)

    if(message === "Invalid token!")
        return response.sendStatus(403);
    

    getCustomersData((error,result)=>{

        if(error)
            return response.json("Failed fetching the data!");

        return response.json(result);

    });
});

app.get('/unprotectedResource', (request, response)=>{

    getCustomersName((error,result)=>{

        if(error)
            return response.json("Failed fetching the data!");

        return response.json(result);

    });

});

app.post('/blacklistToken', (request, response)=>{

    let bearer_token = request.headers.authorization;
    bearer_token = bearer_token.split(' ');

    const isBearer = bearer_token[0];
    const token = bearer_token[1];

    if(isBearer === "Bearer"){

        if(token !== "00000000"){
            addTokenToBlacklist(token);
            return response.json("Blacklisted!");
        }
        else{
            return response.json("Not Blacklisted!");
        }
    }
    else
    {
        return response.sendStatus(403);
    }

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));