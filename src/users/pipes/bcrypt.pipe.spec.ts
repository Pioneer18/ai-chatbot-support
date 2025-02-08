import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "../dto/create-user.dto";
import { BcryptHashPipe } from "./bcrypt.pipe";
import * as bcrypt from 'bcryptjs';

describe('bcrypt pipe', () => {
    let pipe: BcryptHashPipe;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BcryptHashPipe]
        }).compile()
        pipe = module.get<BcryptHashPipe>(BcryptHashPipe);
    })

    it('should update the req.body payload password field with a hash of that password', async () => {
        const data: CreateUserDto = {
            firstName: 'John',
            lastName: '117',
            email: 'master.chief@unsc.com',
            password: 'cortana',
            phoneNumber: '1234567890',
        };

        await pipe.transform(data);
        expect(data.password).not.toBe('cortana');

        // ensure the transformed password can be verified with bcrypt
        const isMatch = await bcrypt.compare('cortana', data.password);
        expect(isMatch).toBe(true);
    });

    it('should throw an error if there is no password or the password is empty', async () => {
        const data: CreateUserDto = {
            firstName: 'John',
            lastName: '117',
            email: 'master.chief@unsc.com',
            password: '',
            phoneNumber: '1234567890',
        };

        await expect(pipe.transform(data)).rejects.toThrow('Cannot create new user, no password provided');
    });
})