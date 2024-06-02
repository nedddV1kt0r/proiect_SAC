const db_conn = require('./dbconnection')

function getCustomersName(callback)
{
    let data;

    const query = "SELECT name FROM customers";

    db_conn.query(query, [], (error, result) => {

        if(error)
            callback(error,null)

        callback(null,result)


    });

    return data;
}

function getCustomersData(callback)
{
    let data;

    const query = "SELECT * FROM customers";

    db_conn.query(query, [], (error, result) => {

        if(error)
            callback(error,null)

        callback(null,result)


    });

    return data;
}

module.exports = {getCustomersName, getCustomersData};