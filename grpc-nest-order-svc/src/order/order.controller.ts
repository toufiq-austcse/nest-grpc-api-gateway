import {Controller} from '@nestjs/common';
import {OrderService} from "./order.service";
import {GrpcMethod} from "@nestjs/microservices";
import {CreateOrderResponse, ORDER_SERVICE_NAME} from "./proto/order.pb";
import {CreateOrderRequestDto} from "./order.dto";

@Controller('order')
export class OrderController {
    constructor(private service: OrderService) {
    }

    @GrpcMethod(ORDER_SERVICE_NAME, 'createOrder')
    async createOrder(data: CreateOrderRequestDto): Promise<CreateOrderResponse> {
        return this.service.createOrder(data);
    }
}

