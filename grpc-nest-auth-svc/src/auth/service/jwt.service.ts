import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {JwtService as Jwt} from '@nestjs/jwt'
import {AuthEntity} from "../auth.entity";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtService {
    constructor(@InjectRepository(AuthEntity) private repository: Repository<AuthEntity>, private jwt: Jwt) {
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    // Get User by User ID we get from decode()
    public async validateUser(decoded: any): Promise<AuthEntity> {
        return this.repository.findOne({
            where: {
                id: decoded.id
            }
        });
    }

    // Generate JWT Token
    public generateToken(auth: AuthEntity): string {
        return this.jwt.sign({id: auth.id, email: auth.email});
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // Encode User's password
    public encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    public async verify(token: string): Promise<any> {
        try {
            return this.jwt.verify(token);
        } catch (err) {
        }
    }
}