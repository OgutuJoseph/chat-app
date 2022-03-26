const redisClient = require('../../redis');

const addFriend = async (socket, friendName, cb) => {
    //2. Check if we're adding ourselves as friend
    if(friendName === socket.user.username){ 
        cb({ done: false, errorMsg: 'Cannot add yourself as a friend.' });
        return;

    }
    // console.log('Friend Name: ', friendName);
    const friend = await redisClient.hgetall(
        `userid:${friendName}`
    ); 
    console.log('Friend Details: ', friend);

    // for 3..(to see if friend is in current friend list)
    const currentFriendList = await redisClient.lrange(
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
    if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
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
        connected: friend.connected,
    };
    cb({ done: true, newFriend });
};

module.exports = addFriend;