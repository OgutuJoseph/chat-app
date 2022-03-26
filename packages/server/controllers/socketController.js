const addFriend = require('./socketio/addFriend');
const authorizeUser = require('./socketio/authorizeUser');
const initializeUser = require('./socketio/initializeUser');
const onDisconnect =    require('./socketio/onDisconnect');
const parseFriendList = require('./socketio/parseFriendList');
const directMessage = require('./socketio/directMessage')

module.exports = {
    addFriend,
    authorizeUser,
    initializeUser,
    onDisconnect,
    parseFriendList,
    directMessage,
};