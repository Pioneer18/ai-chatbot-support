import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindByEmailDto } from '../dto/find-user.dto';
import { RemoveUserDto } from '../dto/remove-user.dto';
import { BcryptHashPipe } from '../pipes/bcrypt.pipe';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CreateUserValidation } from '../schema/create-user-validation.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UsePipes(new BcryptHashPipe())
    @UsePipes(new JoiValidationPipe(CreateUserValidation))
    @Post('signup')
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
