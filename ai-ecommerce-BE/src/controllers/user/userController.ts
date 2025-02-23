import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/User';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    }
    catch(error) {
        next(error);
    }
}

export const getProfileUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id).select("-password");
        if(!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch(error) {
        next(error);
    }
}