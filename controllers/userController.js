import User from "../models/UserModel.js";
import bcrypt from "bcrypt"
import { userToken } from "../utils/generateToken.js";
import 'dotenv/config';
import jwt from "jsonwebtoken";



export const signUP = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(401).send('user already exist')
        }

        const saltRounds = 10;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: 'user'
        });

        const newUserCreated = await newUser.save();

        if (!newUserCreated) {
            return res.status(403).send('new user is not created');
        }

        const token = userToken(newUserCreated);

        const isProduction = process.env.NODE_ENV === "production";
        console.log(isProduction, '====idProduction');

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // Secure only in production
            sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
        });


        res.status(200).send("signed up successfully")


    } catch (error) {
      
        res.status(500).send("Internal error");
    }

}


export const signIn = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email }) ;

        if (!user) {
            return res.status(401).send('invalid email');
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).send('invalid password');
        }

        const role = user.role;

        const token = userToken(user);

        const isProduction = process.env.NODE_ENV === "production";
        console.log(isProduction, '====isProduction');

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // Secure only in production
            sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
        });

        const currentUser = user.toObject();
         delete currentUser.password ;

        // res.send("Login successfull");
        res.json({ message: "loged in", role,user:currentUser });


    } catch (error) {
        console.log(error, "something went wrong");
        res.status(500).send("Internal Error")
    }

}



export const findCurrentUser = async (req, res) => {

    const token = req.cookies.token;

    console.log(token);
    try {

        const decoded = jwt.verify(token, process.env.secretKey);
        console.log(decoded);
        const user = await User.findOne({ email: decoded.data }).select("-password")
        //console.log(user);
        if (!user) {
            return res.send("no user found");
        } else {
            return res.send(user);
        }
    } catch (error) {
        console.log(error);
    }
}


export const updateUserDetails = async (req, res) => {
    try {
      const userId = req.user.id; // Get the user ID from the token middleware.
      const { firstName, lastName, email } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email },
        { new: true } // Return the updated document.
      );
  
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  };
  


  export const logout = (req, res) => {

    try {
        const isProduction = process.env.NODE_ENV === "production";

        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};



