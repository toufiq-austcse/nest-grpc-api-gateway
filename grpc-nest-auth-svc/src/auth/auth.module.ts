import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthEntity} from "./auth.entity";
import {AuthService} from "./service/auth.service";
import {JwtService} from "./service/jwt.service";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    imports: [JwtModule.register({
        secret: 'dev',
        signOptions: {expiresIn: '365d'}
    }), TypeOrmModule.forFeature([AuthEntity])],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy]
})
export class AuthModule {
}
