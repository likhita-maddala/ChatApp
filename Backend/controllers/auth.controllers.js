import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log('Received signup request with body:', req.body);

        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return res.status(400).json({ error: "Passwords do not match" });
        }

        if (!username || username.trim() === '') {
            console.log('Invalid username:', username);
            return res.status(400).json({ error: "Username is required and can't be empty" });
        }

        const user = await User.findOne({ username });
        if (user) {
            console.log('Username already exists:', username);
            return res.status(400).json({ error: "Username already exists" });
        }

        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            console.log('Saving new user to database...');
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            console.log('User created successfully:', newUser);
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            console.log('Invalid user details');
            return res.status(400).json({ error: "Invalid user details" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received login request with body:', req.body);

        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log('Incorrect password for user:', username);
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        console.log('User logged in successfully:', user);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        console.log('User logged out successfully');
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error);
        return res.status(500).json({ error: error.message });
    }
};
