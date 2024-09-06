import { Request, Response } from 'express';
import userService from '../services/user.service';
import { generateToken } from '../utils/token.util';

class UserController {
    async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await userService.register(username, password);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await userService.login(username, password);
            const token = generateToken(user.id);
            res.json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await userService.findAll();
            res.json({ users });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();
