import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { User } from '../../models/User';
import { generateAccessToken } from '../../utils/generateAccessToken';
import { generateRefreshToken } from '../../utils/generateRefreshToken';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Generate tokens
        const token = generateAccessToken({ id: user._id, email: user.email, role: user.role }); 
        const refreshToken = generateRefreshToken({ id: user._id,  email: user.email, role: user.role }); 

        // console.log(jwt.decode(refreshToken));
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: "strict" });
        
        // Return token and some basic user info
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                role: user.role 
            }
        });  // role: user.role
    }
    catch(error) {
        console.error("Error logging in user", error);
        next(error);
    }
}
