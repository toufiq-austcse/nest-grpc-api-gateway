import {Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards} from '@nestjs/common';
import {CreateOrderRequest, ORDER_SERVICE_NAME, OrderServiceClient} from "./order.pb";
import {ClientGrpc} from "@nestjs/microservices";
import {AuthGuard} from "../auth/auth.guard";
import {CreateOrderReqDto, CreateOrderResDto} from "./dto/order.dto";
import {ApiCreatedResponse} from "@nestjs/swagger";

@Controller('order')
export class OrderController implements OnModuleInit {
    private svc: OrderServiceClient

    constructor(@Inject(ORDER_SERVICE_NAME) private client: ClientGrpc) {
    }

    onModuleInit(): any {
        this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME)
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiCreatedResponse({
        type:CreateOrderResDto
    })
    async createOrder(@Body() body: CreateOrderReqDto, @Req() req: any) {
        body.userId = <number>req.user;
        console.log(body)
        return this.svc.createOrder(body);
    }
}
