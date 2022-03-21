const express = require('express');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter'); 
const { sessionMiddleware, wrap, corsConfig } = require('./controllers/serverController');
const { authorizeUser } = require('./controllers/socketController');


const app = express();
const server = require('http').createServer(app);


const io = new Server(server, {
    cors: corsConfig,
});

app.use(helmet());

app.use(cors(corsConfig));
app.use(express.json());

// app.use(
//     session({
//         secret: process.env.COOKIE_SECRET,
//         credentials: true,
//         name: 'sid',
//         resave: false,
//         saveUninitialized: true,
//         cookie: { 
    //         secure: process.env.NODE_ENV === 'production' ? 'true': 'auto',
//             secure: process.env.ENVIRONMENT === 'production' ? 'true': 'auto',
//             httpOnly: true,
//             expires: 1000 * 60 * 60 * 24 * 7,
    //         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//             sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
//         }
//     })
// );
app.use(
    sessionMiddleware
);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json('Server Running');
})

io.use(wrap(sessionMiddleware));

io.use(authorizeUser);

io.on("connect", socket => {
    console.log('socket Id: ', socket.id);
    console.log('socket user: ', socket.request.session.user.username);
});

server.listen(4000, () => {
    console.log('Server Listening on Port 4000');
});