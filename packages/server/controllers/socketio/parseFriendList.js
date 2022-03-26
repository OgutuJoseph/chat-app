const redisClient = require('../../redis');


const parseFriendList = async (friendList) => {
    const newFriendList = [];
    for (let friend of friendList) {
        const parsedFriend = friend.split('.')
        const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, 'connected')
        console.log('FRIEND-PARSED: ', parsedFriend);
        newFriendList.push({
            username: parsedFriend[0], 
            userid: parsedFriend[1], 
            connected: friendConnected
        });
        console.log('NEWWFRIENDLIST: ', newFriendList);
    }
    return newFriendList;
};

module.exports = parseFriendList;