const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
    service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, rePassword } = req.body;
        if (password !== rePassword) return res.status(400).json({ error: "Passwords mismatch" });
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email taken" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username, email, password: hashedPassword,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`
        });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const redisClient = req.app.get('redisClient');
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        if (user.authType === 'local') {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid password" });
        }

        const otp = generateOTP();
        await redisClient.setEx(`otp:${email}`, 300, otp);
        await transporter.sendMail({
            from: 'FinBud', to: email, subject: 'Login Code', html: `<h3>Code: ${otp}</h3>`
        });
        res.json({ message: "OTP Sent", requireOtp: true, email });
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const redisClient = req.app.get('redisClient');
        const storedOtp = await redisClient.get(`otp:${email}`);
        if (!storedOtp || storedOtp !== otp) return res.status(400).json({ error: "Invalid OTP" });

        await redisClient.del(`otp:${email}`);
        const user = await User.findOne({ email });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ message: "Success", token, user });
    } catch (e) { res.status(500).json({ error: "Error" }); }
});

router.post('/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
        const { email, name, picture } = ticket.getPayload();
        
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ username: name, email, password: null, authType: 'google', avatar: picture });
            await user.save();
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ message: "Success", token, user });
    } catch (e) { res.status(400).json({ error: "Google Failed" }); }
});

module.exports = router;