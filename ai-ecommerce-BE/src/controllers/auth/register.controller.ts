import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from 'express';


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        // Check email has been existed yet
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email has been existed" });
            return;
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    }
    catch(error) {
        next(error);
    }
}





