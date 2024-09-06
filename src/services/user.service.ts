import bcrypt from 'bcryptjs';
import userRepository from '../repositories/user.repository';

class UserService {
    async register(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await userRepository.createUser(username, hashedPassword);
    }

    async login(username: string, password: string) {
        const user = await userRepository.findUserByUsername(username);
        if (!user) throw new Error('Invalid credentials');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');
        return user;
    }

    async findAll() {
        return await userRepository.findAll();
    }
}

export default new UserService();
