const redisClient = require('../redis');

module.exports.authorizeUser = (socket, next) => {
    if(!socket.request.session ||  !socket.request.session.user) {
        console.log('Bad request; No Session / Session User!');
        next(new Error('Not Authorized.'))
    } else {
        next();
    }
};

module.exports.initializeUser = async socket => {
    socket.user = { ...socket.request.session.user };
    await redisClient.hset(
        `userid:${socket.user.username}`, 
        'userid', 
        socket.user.userid
    );

    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
        )
    console.log('Friend List: ', friendList);
    socket.emit('friends', friendList)

    // console.log('socket user: ', socket.user);
    // console.log('socket Id: ', socket.id);
    //ABOVE TWO OR
    console.log('User Id: ', socket.user.userid);

    console.log('socket username: ', socket.request.session.user.username);
};

module.exports.addFriend = async (socket, friendName, cb) => {
    //2. Check if we're adding ourselves as friend
    if(friendName === socket.user.username){ 
        cb({ done: false, errorMsg: 'Cannot add yourself as a friend.' });
        return;

    }
    // console.log('Friend Name: ', friendName);
    const friendUserID = await redisClient.hget(
        `userid:${friendName}`, 
        'userid'
    ); 
    // console.log('Friend User Id: ', friendUserID);

    // for 3..
    const currentFriendist = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    )

    // 1. Check if user exists
    if(!friendUserID) {
        cb({ done: false, errorMsg: 'User does not exist.' });
        return;
    }

    // 3. Check if user exists in our friendlist
    if (currentFriendist && currentFriendist.indexOf(friendName) != -1) {
        cb({ done: false, errorMsg: 'Friend already added.' });
        return;
    }

    await redisClient.lpush(`friends:${socket.user.username}`, friendName);
    cb({ done: true });
}