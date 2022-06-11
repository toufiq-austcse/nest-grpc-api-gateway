import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JwtService} from "../service/jwt.service";
import {AuthEntity} from "../auth.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'dev',
            ignoreExpiration: true
        });
    }

    private validate(token: string): Promise<AuthEntity | never> {
        return this.jwtService.validateUser(token);
    }
}