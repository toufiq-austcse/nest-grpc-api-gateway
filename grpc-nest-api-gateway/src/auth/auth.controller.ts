import {Body, Controller, Inject, OnModuleInit, Post} from '@nestjs/common';
import {AUTH_SERVICE_NAME, AuthServiceClient} from "./auth.pb";
import {ClientGrpc} from "@nestjs/microservices";
import {LoginReqDto, LoginResDto, RegisterReqDto, RegisterResDto} from "./dto/auth.dto";
import {ApiCreatedResponse} from "@nestjs/swagger";

@Controller('auth')
export class AuthController implements OnModuleInit {
    private svc: AuthServiceClient;

    constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {
    }

    onModuleInit(): any {
        this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);

    }

    @Post('register')
    @ApiCreatedResponse({
        type: RegisterResDto
    })
    async register(@Body() body: RegisterReqDto) {
        return this.svc.register(body);
    }

    @Post('login')
    @ApiCreatedResponse({
        type:LoginResDto
    })
    async login(@Body() body: LoginReqDto) {
        return this.svc.login(body);
    }


}
