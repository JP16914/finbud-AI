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
        
        // Kiểm tra Redis
        if (!redisClient) {
            console.error("❌ Redis client not initialized");
            return res.status(500).json({ error: "Redis not ready" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        if (user.authType === 'local') {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid password" });
        }

        const otp = generateOTP();
        console.log(`🔑 DEBUG: OTP for ${email} is ${otp}`); // Xem OTP ở Terminal để test

        // Lưu vào Redis
        await redisClient.setEx(`otp:${email}`, 300, otp);

        // Gửi Email (Bọc trong try-catch riêng để không làm sập cả request)
        try {
            await transporter.sendMail({
                from: '"FinBud Support" <finbud206@gmail.com>', 
                to: email, 
                subject: 'Your Login Code', 
                html: `<h3>Your code is: ${otp}</h3>`
            });
        } catch (mailError) {
            console.error("⚠️ Mail sending failed:", mailError.message);
            // Vẫn cho phép tiếp tục nếu đang test local
        }

        res.json({ message: "OTP Sent", requireOtp: true, email });
    } catch (e) { 
        console.error("❌ Login Error:", e); // Xem lỗi thật ở đây
        res.status(500).json({ error: "Internal Server Error" }); 
    }
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
        const token = req.body.token || req.body.credential;
        if (!token) {
            return res.status(400).json({ error: "Missing Google Token" });
        }
        const ticket = await googleClient.verifyIdToken({ 
            idToken: token, 
            audience: process.env.GOOGLE_CLIENT_ID 
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub } = payload;
        
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ username: name, email, password: sub, authType: 'google', avatar: picture, isVerified: true });
            await user.save();
        }
        const jwtToken = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ 
            token: jwtToken, 
            user: { name: user.username, email: user.email, picture: user.avatar } 
        });
    } catch (e) { 
        console.error("❌ Google Auth Error:", e.message);
        res.status(400).json({ error: "Google Login Failed", details: e.message }); 
    }
});

module.exports = router;