import { User } from 'src/users/user.entity';

export const MockUser: User = {
    id: 1,
    first_name: 'Sunset',
    last_name: 'The Cat',
    phone_number: '888-888-8888',
    email: 'sunset.the.cat@gmail.com',
    password_hash: 'h13oh30=',
    role: 'patient',
    profile_pic: 'some-gcp-bucket-url',
    is_active: true,
};
