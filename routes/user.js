const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


routes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
       
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign({ userId: user._id }, 'secret-key');

        
        res.json({ message: 'Login successful', token, redirectUrl: 'https://www.bigcommerce.com/product-tour/' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


routes.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        
        const existingUser = await User.findOne({ username });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = routes;
