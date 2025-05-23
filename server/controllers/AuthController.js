import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

const maxAge = 3 * 60 * 60; // in seconds, not milliseconds

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password are required.");
        }

        const user = await User.create({ email, password }); // corrected

        const token = createToken(email, user.id);

        response.cookie("jwt", token, {
            maxAge: maxAge * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password are required.");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send("User with the given email not found.")
        }
        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(401).send("Invalid Password");
        }
        const token = createToken(email, user.id);

        response.cookie("jwt", token, {
            maxAge: maxAge * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                colors: user.colors,
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const getUserInfo = async (request, response, next) => {
    try {
        const userData = await User.findById(request.userId);
        if (!userData) {
            return response.status(404).send("User not found.");
        }

        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            colors: userData.colors,
        });
    } catch (error) {
        console.log("Get User Info error:", error);
        return response.status(500).send("Internal Server Error");
    }

};
export {
    signup,
    login,
    getUserInfo,
};
