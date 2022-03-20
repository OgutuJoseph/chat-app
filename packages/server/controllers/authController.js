const pool = require('../db');
const bcrypt = require('bcrypt'); 

module.exports.handleLogin = (req, res) => {
    if(req.session.user && req.session.user.username)
    {
        console.log('logged in')
        res.json({ loggedIn: true, username: req.session.user.username });
    }
    else
    {
        res.json({ loggedIn: false });
    }
};

module.exports.attemptLogin = async (req, res) => {
    // console.log(req.session)
    const potentialLogin = await pool.query(
        'SELECT id, username, passhash FROM users u WHERE u.username=$1',
        [req.body.username]
    );

    if(potentialLogin.rowCount > 0)
    {
        //user found
        const isSamePass = await bcrypt.compare(
            req.body.password, 
            potentialLogin.rows[0].passhash
        );
        if(isSamePass)
        {
            //login
            req.session.user = {
                username: req.body.username,
                id: potentialLogin.rows[0].id,
            };
            res.json({ loggedIn: true, username: req.body.username });
        }
        else
        {
            //not good login
            console.log('not good');
            res.json({ loggedIn: false, status: 'Invalid username or password!' });
            
        }
    }
    else
    {
        //user not found
        console.log('not good');
        res.json({ loggedIn: false, status: 'Invalid username or password!' });
    }
};

module.exports.attemptRegister = async (req, res) => {
    const existingUser = await pool.query(
        'SELECT username FROM users WHERE username=$1',
        [req.body.username]
    );

    if (existingUser.rowCount === 0) 
    {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const newUserQuery = await pool.query(
            'INSERT INTO users(username, passhash) values ($1, $2) RETURNING id, username',
            [req.body.username, hashedPass]
        ); 
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id,
        };
        res.json({ loggedIn: true, username: req.body.username });
    }
    else 
    {
        res.json({ loggedIn: false, status: 'Username already taken.' })
    }
};
