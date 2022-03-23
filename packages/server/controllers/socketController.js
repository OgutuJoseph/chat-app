const redisClient = require('../redis');

module.exports.authorizeUser = (socket, next) => {
    if(!socket.request.session ||  !socket.request.session.user) {
        console.log('Bad request; No Session / Session User!');
        next(new Error('Not Authorized.'))
    } else {
        socket.user = { ...socket.request.session.user };
        redisClient.hset(
            `userid:${socket.user.username}`, 
            'userid', 
            socket.user.userid
        );
        next();
    }
}