const express = require('express');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const session = require('express-session');


const app = express();
const server = require('http').createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: 'true',
    },
});

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// app.use(
//     session({
//         secret: process.env.COOKIE_SECRET,
//         credentials: true,
//         name: 'sid',
//         resave: false,
//         saveUninitialized: true,
//         cookie: { 
//             secure: process.env.ENVIRONMENT === 'production' ? 'true': 'auto',
//             httpOnly: true,
//             expires: 1000 * 60 * 60 * 24 * 7,
//             sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
//         }
//     })
// );
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        name: 'sid',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: process.env.ENVIRONMENT === 'production',
            httpOnly: true,
            expires: 1000 * 60 * 60 * 24 * 7,
            sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
        }
    })
);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json('Server Running');
})



io.on('connect', socket => {});

server.listen(4000, () => {
    console.log('Server Listening on Port 4000');
});