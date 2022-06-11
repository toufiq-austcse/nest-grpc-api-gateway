import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../auth.pb";
import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterReqDto implements RegisterRequest {

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    password: string;

}

export class RegisterResDto implements RegisterResponse {

    @ApiProperty()
    error: string[];
    @ApiProperty()
    status: number;

}

export class LoginReqDto implements LoginRequest {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    password: string;

}

export class LoginResDto implements LoginResponse {
    @ApiProperty()
    error: string[];

    @ApiProperty()
    status: number;

    @ApiProperty()
    token: string;

}