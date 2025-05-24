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
                color: user.color,
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
            return response.status(404).send("User with the given id not found.");
        }

        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
        console.log("Get User Info error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const updateProfile = async (request, response, next) => {
  try {
    const { userId } = request;
    const { firstName, lastName, color } = request.body;

    if (!userId) {
      return response.status(401).send("Unauthorized: Missing user ID");
    }
    console.log("Received color:", color);

    if (!firstName || !lastName || typeof color !== "number") {
      return response.status(400).send("First Name, Last Name, and color are required.");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true
      },
      {
        new: true,
        runValidators: true
      }
    );

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
      color: userData.color,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return response.status(500).send("Internal Server Error");
  }
};




export {
    signup,
    login,
    getUserInfo,
    updateProfile,
};
