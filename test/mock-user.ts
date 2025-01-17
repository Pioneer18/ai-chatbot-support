import { User } from '../src/users/interface/enity/user.entity';

export const MockUser: User = {
    id: '9d3c5b62-d559-4960-ad1d-da083c089f0e',
    resetPasswordExpires: '01-10-2029',
    resetPasswordToken: 'mock-token',
    password: '$2b$10$Q3HmnULDiq/G4.tv.cJX2uUJwv.9iZfBQdg0gyxQHSJHT1kecw6V.', // decrypted: notthispassword
    role: 'patient',
    profilePic: 'mock-pic-url',
    isActive: true,
    firstName: 'Solid',
    lastName: 'Snake',
    phoneNumber: '123456789',
    email: 'solid.snake@gmail.com',
};
