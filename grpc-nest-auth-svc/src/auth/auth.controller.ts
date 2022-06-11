import {Controller} from '@nestjs/common';
import {AuthService} from "./service/auth.service";
import {LoginRequestDto, RegisterRequestDto, ValidateRequestDto} from "./auth.dto";
import {AUTH_SERVICE_NAME, LoginResponse, RegisterResponse, ValidateResponse} from "./auth.pb";
import {GrpcMethod} from "@nestjs/microservices";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'register')
    register(payload: RegisterRequestDto): Promise<RegisterResponse> {
        return this.authService.register(payload);
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'login')
    login(payload: LoginRequestDto): Promise<LoginResponse> {
        return this.authService.login(payload);
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'validate')
    validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
        return this.authService.validate(payload);
    }
}
