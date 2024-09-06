import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { AppDataSource } from '../config/database.config';

class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findAll() {
        return await this.repository.find();
    }

    async findUserByUsername(username: string) {
        return await this.repository.findOneBy({ username });
    }

    async createUser(username: string, password: string) {
        const user = this.repository.create({ username, password });
        return await this.repository.save(user);
    }
}

export default new UserRepository();
