import {CreateProductRequest, CreateProductResponse, FindOneData, FindOneResponse} from "../product.pb";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductReqDto implements CreateProductRequest {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    sku: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    stock: number;

}

export class CreateProductResDto implements CreateProductResponse {
    @ApiProperty()
    error: string[];

    @ApiProperty()
    id: number;

    @ApiProperty()
    status: number;

}

export class FindOneDataDto implements FindOneData {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    stock: number;

}

export class FindOneResDto implements FindOneResponse {
    @ApiProperty({
        type: FindOneDataDto
    })
    data: FindOneData | undefined;
    @ApiProperty()
    error: string[];
    @ApiProperty()
    status: number;

}