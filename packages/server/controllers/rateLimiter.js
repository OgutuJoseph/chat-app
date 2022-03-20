const redisClient = require('../redis');

module.exports.rateLimiter = (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip = req.connection.remoteAddress.slice(0, 4);
    // console.log('ip: ', ip);
    const [response] = await redisClient
        .multi()
        .incr(ip)
        .expire(ip, secondsLimit)
        .exec();
    console.log(response[1]);

    if(response[1] > limitAmount) res.json({ loggedIn: false, status: 'Max attempts within the time limit(1 minute) elapsed. Try after some time.' });
    else next();
};
