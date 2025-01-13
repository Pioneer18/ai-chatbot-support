import { User } from '../src/users/interface/enity/user.entity';

export const MockUser: User = {
    id: '9d3c5b62-d559-4960-ad1d-da083c089f0e',
    reset_password_expires: '01-10-2025',
    reset_password_token: 'mock-token',
    password_hash: 'mock-hash',
    role: 'patient',
    profile_pic: 'mock-pic-url',
    is_active: true,
    first_name: 'Solid',
    last_name: 'Snake',
    phone_number: '123456789',
    email: 'solid.snake@gmail.com',
};
