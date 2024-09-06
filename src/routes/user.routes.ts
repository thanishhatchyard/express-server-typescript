import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/', userController.findAll)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed' });
});

export default router;
