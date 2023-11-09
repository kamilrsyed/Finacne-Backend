const User = require('../models/User');

const getAllUsers = async (req, res) => {
    console.log(req);
    console.log(req.headers);
    console.log(req.body);
    const users = await User.find({});
    res.status(200).json({ users });
}

module.exports = {
    getAllUsers
}