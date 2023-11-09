const BadRequestError = require('../errors/bad-request');
const UnauthenticatedError = require('../errors/unauthenticated');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // console.log('email', email);
    // console.log('password', password);
    console.log(JSON.stringify(req.headers));
    console.log(req.body);

    // email/pass available?
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    // validate email/pass
    const user = await User.findOne({ email });
    // console.log('user.name', user.name);
    // console.log('user.email', user.email);

    if (!user) {
        throw new UnauthenticatedError('Invalid username or password');
    }
    const isPassCorrect = await user.checkPass(password);
    if (!isPassCorrect) {
        throw new UnauthenticatedError('Invalid username or password');
    }
    // send response
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

module.exports = {
    register,
    login
}