const redisClient = require("../../redis");

const directMessage = async (socket, message) => {
    // const parsedMessage = { ...message, from: socket.user.userid }
    // const messageString = [ 
    //     parsedMessage.to, 
    //     parsedMessage.from, 
    //     parsedMessage.content 
    // ].join('.');

    // await redisClient.lpush(`chat:${parsedMessage.to}`, messageString);
    // await redisClient.lpush(`chat:${parsedMessage.from}`, messageString);

    // socket.to(parsedMessage.to).emit('dm', parsedMessage);

    message.from = socket.user.userid;
    const messageString = [ 
        message.to, 
        message.from, 
        message.content 
    ].join('.');

    await redisClient.lpush(`chat:${message.to}`, messageString);
    await redisClient.lpush(`chat:${message.from}`, messageString);

    socket.to(message.to).emit('dm', message);

};

module.exports = directMessage;