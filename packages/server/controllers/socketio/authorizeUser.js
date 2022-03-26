const authorizeUser = (socket, next) => {
    if(!socket.request.session ||  !socket.request.session.user) {
        console.log('Bad request; No Session / Session User!');
        next(new Error('Not Authorized.'))
    } else {
        next();
    }
};

module.exports = authorizeUser;