import express from 'express';
import { sendMessageByEmail } from '../controllers/email/email.controller';

const router = express.Router();

router.post('/send', sendMessageByEmail);

export default router;