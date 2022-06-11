import {HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthEntity} from "../auth.entity";
import {Repository} from "typeorm";
import {JwtService} from "./jwt.service";
import {LoginRequestDto, RegisterRequestDto, ValidateRequestDto} from "../auth.dto";
import {LoginResponse, RegisterResponse, ValidateResponse} from "../auth.pb";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity) private repository: Repository<AuthEntity>, private jwtService: JwtService) {
    }

    async register({email, password}: RegisterRequestDto): Promise<RegisterResponse> {
        let auth: AuthEntity = await this.repository.findOne({where: {email}});
        if (auth) {
            return {status: HttpStatus.CONFLICT, error: ['Email already exists']}
        }
        auth = new AuthEntity();
        auth.email = email;
        auth.password = this.jwtService.encodePassword(password);
        await this.repository.save(auth);
        return {status: HttpStatus.CREATED, error: []}
    }

    async login({email, password}: LoginRequestDto): Promise<LoginResponse> {
        let auth: AuthEntity = await this.repository.findOne({where: {email}});
        if (!auth) {
            return {status: HttpStatus.NOT_FOUND, error: ['Email not found'], token: null}
        }
        let isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);
        if (!isPasswordValid) {
            return {status: HttpStatus.NOT_FOUND, error: ['Password not found'], token: null}
        }
        let token: string = this.jwtService.generateToken(auth);
        return {token, status: HttpStatus.OK, error: null}
    }

    async validate({token}: ValidateRequestDto): Promise<ValidateResponse> {
        let decoded: AuthEntity = await this.jwtService.verify(token);
        console.log('decoded ',decoded)
        if (!decoded) {
            return {status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null};
        }
        const auth: AuthEntity = await this.jwtService.validateUser(decoded);

        if (!auth) {
            return {status: HttpStatus.CONFLICT, error: ['User not found'], userId: null};
        }

        return {status: HttpStatus.OK, error: null, userId: decoded.id};
    }
}