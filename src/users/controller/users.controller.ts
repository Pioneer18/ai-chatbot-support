import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindByEmailDto } from '../dto/find-user.dto';
import { RemoveUserDto } from '../dto/remove-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    async update(@Body() id: string, updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    async findByEmail(@Body() emailDto: FindByEmailDto) {
        return this.usersService.findByEmail(emailDto);
    }

    async remove(@Body() removeUserDto: RemoveUserDto) {
        return this.usersService.removeUser(removeUserDto);
    }
}
