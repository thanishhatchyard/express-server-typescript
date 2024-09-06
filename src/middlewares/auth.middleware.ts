import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token.util';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = verifyToken(token);
        // @ts-ignore
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
