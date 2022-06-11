import {Module} from '@nestjs/common';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {Order} from "./order.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME} from "./proto/product.pb";

@Module({
    imports: [TypeOrmModule.forFeature([Order]), ClientsModule.register([{
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:50053',
            package: PRODUCT_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/product.proto',

        }
    }])],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {
}
