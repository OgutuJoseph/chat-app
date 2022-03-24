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
    socket.join(socket.user.username);
    await redisClient.hset(
        `userid:${socket.user.username}`, 
        'userid', 
        socket.user.userid,
        'connected',
        true
    );

    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`, 
        0,
        -1
    );
    const parsedFriendList = await parseFriendList(friendList);
    const friendRooms = parsedFriendList.map(friend => friend.userid);

    if (friendRooms.length > 0)
        socket.to(friendRooms).emit('connected', true, socket.user.username);

    console.log(`${socket.user.username} friends: `, parsedFriendList);
    socket.emit('friends', parsedFriendList)

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
    const friend = await redisClient.hgetall(
        `userid:${friendName}`
    ); 
    // console.log('Friend User Id: ', friendUserID);

    // for 3..
    const currentFriendist = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    )

    // 1. Check if user exists
    if(!friend) {
        cb({ done: false, errorMsg: 'User does not exist.' });
        return;
    }

    // 3. Check if user exists in our friendlist
    if (currentFriendist && currentFriendist.indexOf(friendName) != -1) {
        cb({ done: false, errorMsg: 'Friend already added.' });
        return;
    }

    await redisClient.lpush(`friends:${socket.user.username}`, [
        friendName, 
        friend.userid
        ].join('.')
    );

    const newFriend = {
        username: friendName,
        userid: friend.userid,
        conncted: friend.conncted,
    };
    cb({ done: true, newFriend });
};

module.exports.onDisconnect = async (socket) => {
    await redisClient.hset(
        `userid:${socket.user.username}`, 
        'connected', 
        false
    );
    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`, 
        0,
        -1
    );
    const friendRooms = await parseFriendList(friendList).then(friends => 
        friends.map(friend => friend.userid)
    );
    socket.to(friendRooms).emit('connected', false, socket.user.username);
    //get friends
    //emit to all friends that we are offline
};

const parseFriendList = async (friendList) => {
    const newFriendList = [];
    for (let friend of friendList) {
        const parsedFriend = friend.split('.')
        const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, 'connected')
        newFriendList.push({
            username: parsedFriend[0], 
            userid: parsedFriend[1], 
            connected: friendConnected
        });
    }
    return newFriendList;
}