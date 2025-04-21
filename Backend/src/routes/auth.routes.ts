import express from 'express';
import { login, logout, oauthLogin, register } from '../controllers/auth/auth.controller';
import { refreshToken } from '../controllers/auth/refreshToken.controller';
import { protectedRoute } from '../controllers/auth/protect.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/oauth/appwrite-login', oauthLogin);
router.post('/refresh-token', refreshToken);
router.get('/protected-route', protectedRoute);

export default router;
