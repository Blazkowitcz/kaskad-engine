import {Controller, Post, Body, HttpException, HttpStatus, Inject} from "@nestjs/common";
import {AddUserDto} from "../user/dtos/user-add.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    /**
     * Sign up new user
     * @param user {AddUserDto}
     */
    @Post('signup')
    async signup(@Body() user: AddUserDto): Promise<boolean> {
        return this.authService.signup(user);
    }

    @Post('signin')
    async signin(@Body() user: AddUserDto): Promise<string> {
        return this.authService.signin(user);
    }
}