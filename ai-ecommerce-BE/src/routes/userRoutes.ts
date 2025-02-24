import express from 'express';
import { login, register } from '../controllers/auth/index';
import { getUsers, getProfileUser } from '../controllers/user/user.controller';
import { validateToken } from '../utils/jwt';

const router = express.Router();

router.get('/', getUsers);
router.get('/profile', validateToken, getProfileUser);

router.post('/register', register);
router.post('/login', login);


export default router;
