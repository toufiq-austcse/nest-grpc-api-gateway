import {CreateOrderRequest, CreateOrderResponse} from "../order.pb";
import {IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderReqDto implements CreateOrderRequest {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quantity: number;

    userId: number;

}

export class CreateOrderResDto implements CreateOrderResponse {
    @ApiProperty()
    error: string[];

    @ApiProperty()
    id: number;

    @ApiProperty()
    status: number;

}