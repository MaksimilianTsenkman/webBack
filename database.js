const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "123456", // Enter your password here
    database: "web", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});


const execute = async(query) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createPosts = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
	    "date" TIMESTAMP NOT NULL,  
        "link" VARCHAR(200)
    );`;

const createUsers = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;


execute(createPosts).then(result => {
    if (result) {
        console.log('If does not exists, create the "posttable" table');
    }
});

execute(createUsers).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});

module.exports = pool;